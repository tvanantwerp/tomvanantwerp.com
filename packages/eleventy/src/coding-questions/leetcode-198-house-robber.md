---
title: 198. House Robber
description: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/house-robber/)

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return _the maximum amount of money you can rob tonight **without alerting the police**_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

Example 2:

```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```
</details>

<details>
<summary>Constraints</summary>


- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`
</details>

## My Solution

A leetcode problem with a story! This is quite rare, and a real treat![^1] This is a dynamic programming problem, and as such we can solve it either recursively or iteratively.

### Recursive Solution

To solve this problem recursively, we should think about what sub-problem we're trying to solve. Whenever I'm at a house at `index`, I have to decide: am I better off robbing this house, or waiting until I get to the next house? If I rob this house, I get the value of its possessions `nums[index]`, plus the value of all the houses I robbed before if the last house I robbed was the house from two before it at `nums[index - 2]`. If I skip this house, I get the value of all the houses I robbed before this house ending at the house immediately before it at `nums[index - 1]`. If `index` starts at the last value of `nums`, then we can write a recursive function to figure out the sum of the best sequence of houses by working back from `index`. I can work backward until I'm out of houses to compare—that is to say, the `index` is less than `0`. That's our base case.

```typescript
function rob(nums: number[], index?: number): number {
	// This function is modified to accept a second argument
	// from how it's scaffolded in leetcode: index. Because
	// leetcode will give no index value, we check to see
	// if it is undefined before we begin our own recursive
	// comparisons.
	if (index !== undefined) {
		if (index < 0) {
			// Indices less than zero are the base case; we are
			// out of houses to rob! Non-existant houses have
			// a value of zero.
			return 0;
		} else {
			// If we're not yet out of houses to rob, we return the
			// maximum of this house plus the house two before, or
			// the house one before. We recursively call the function
			// to get the sum of other house's values.
			return Math.max(
				rob(nums, index - 2) + nums[index],
				rob(nums, index - 1)
			);
		}
	} else {
		// If index wasn't defined, this means our function is
		// being executed for the first time. We call it again,
		// but this time with a starting index.
		return rob(nums, nums.length - 1);
	}
};
```

This function is correct, but it's not performant. If you try running it in leetcode, it will time out. We need to improve it with memoization.

### Recursive Solution + Memoization

To improve on the previous solution, we add memoization to remember values we've previously computed. This dramatically speeds up our solution. Here, we pass around a `Map` with the `index` as key and the result of our comparisons as the value.

```typescript
function rob(nums: number[], index?: number, memo?: Map<number, number>): number {
	if (index !== undefined) {
		if (index < 0) {
			return 0;
		} else if (memo.has(index)) {
			return memo.get(index)
		} else {
			const result = Math.max(
				rob(nums, index - 2, memo) + nums[index], rob(nums, index - 1, memo)
			);
			memo.set(index, result);
			return result
		}
	} else {
		return rob(nums, nums.length - 1, new Map<number, number>());
	}
};
```

[^1]: If you like tough data structures and algorithms problems with a story, check out [Advent of Code](https://adventofcode.com/) for more and better puzzles.