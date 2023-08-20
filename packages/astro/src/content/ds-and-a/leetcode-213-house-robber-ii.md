---
title: LeetCode 213. House Robber II
description: Given an integer array representing the amount of money of each house, return the maximum amount of money you can rob tonight from a circle of houses without alerting the police by robbing adjacent houses.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/house-robber-ii/)

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return the _maximum amount of money you can rob tonight **without alerting the police**_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
```

Example 2:

```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

Example 3:

```
Input: nums = [1,2,3]
Output: 3
```

</details>

<details>
<summary>Constraints</summary>

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`
</details>

## My Solution

This problem adds a new twist to the original [House Robber](/coding-questions/leetcode-198-house-robber/) problem. In the original, you were trying to maximize your haul from a row of houses. But now you're in a circle![^1] So now you've got the added problem that what might've been the maximum from the houses-in-a-row case won't work because you might have chosen to rob the first and last houses. Those two houses are now adjacent, and you would trigger the alarm!

This may seem very tricky at first, but the solution is actually simple. You know that you can't rob _both_ the first and last house, so we can't even consider a solution that would allow for this. What this means is that we'll either rob the first house and not the last house, or vice versa. So our solution will be the greater of `nums` excluding either the first value or the last value.

Re-using our previous solution, we can just return the `Math.max` of that function's solution to each of these sub-sections of the `nums` array.

```typescript
function rob(nums: number[]): number {
	if (nums.length === 0) return 0;
	if (nums.length === 1) return nums[0];

	return Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
}

// This is our house robber function from #198.
function robLinear(nums: number[]): number {
	if (nums.length === 0) return 0;

	let oneHouseBack = 0,
		twoHousesBack = 0,
		temp = oneHouseBack;
	for (const thisHouse of nums) {
		temp = oneHouseBack;
		oneHouseBack = Math.max(twoHousesBack + thisHouse, oneHouseBack);
		twoHousesBack = temp;
	}

	return oneHouseBack;
}
```

[^1]: I'm trying to imagine this. It can't be a cul-de-sac, beause the road breaks the circle. Is it a little island of houses inside a traffic circle, all sharing a backyard?
