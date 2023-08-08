---
title: LeetCode 55. Jump Game
description: You are given an integer array. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/jump-game/)

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return `true` _if you can reach the last index, or_ `false` _otherwise_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

Example 2:

```
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
```

</details>

<details>
<summary>Constraints</summary>

- <code>1 <= nums.length <= 10<sup>4</sup></code>
- <code>0 <= nums[i] <= 10<sup>5</sup></code>
</details>

## My Solution

### Dynamic Programming

This approach creates an array to store information about whether a given index is reachable or not. We initialize the first value in our `dp` cache array with the value at `nums[0]`, as this represents what number index we can reach from the `0`th index. Then for each index `i`, we check to see if we had sufficient jump range in `dp[i - 1]` to reach it, returning `false` if not. Otherwise, `dp[i]` will be the larger of `nums[i] + i` or `dp[i - 1]`, representing the farthest index we'll be able to reach from position `i`. If at any point we know we can reach an index farther than the last position of `nums`, we go ahead and return `true`. This algorithm has $O(n)$ time complexity and $O(n)$ space complexity.

```typescript
function canJump(nums: number[]): boolean {
	const dp: number[] = [];
	dp[0] = nums[0];

	for (let i = 1; i < nums.length; i++) {
		if (dp[i - 1] < i) return false;

		dp[i] = Math.max(nums[i] + i, dp[i - 1]);

		if (dp[i] >= nums.length - 1) return true;
	}

	return true;
}
```

### Greedy Algorithm

This greedy alogorithm is also $O(n)$ time complexity, but only $O(1)$ space complexity because it doesn't need an entire array to keep track of jump ranges. Instead, it optimistically keeps track of the farthest index you can reach in the `nums` array based on what you've seen so far. If, while iterating over `nums`, you hit an index greater than the farthest you've been able to reach so far, then you know you'll never reach the end and can return `false`. Otherwise, you update the range if you've got a new further range, and return if your range can take you to the end.

```typescript
function canJump(nums: number[]): boolean {
	// I can get away with naming my jump range variable
	// "range" because JavaScript has no `range` function!
	// (I weep softly and dream of Python...)
	let range = 0;
	for (let i = 0; i < nums.length; i++) {
		if (range < i) return false;
		range = Math.max(nums[i] + i, range);
		if (range >= nums.length) return true;
	}
	return true;
}
```
