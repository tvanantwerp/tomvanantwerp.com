---
title: 55. Jump Game
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

This approach creates an array to store information about whether a given index is reachable or not. However, because of the nested for loops, the time complexity is $O(n^{2})$, which isn't very good.

```typescript
function canJump(nums: number[]): boolean {
	const dp: boolean[] = [];
	dp[0] = true;

	for (let i = 0; i < nums.length; i++) {
		// If dp[i] doesn't have a true value, we have
		// gone past what any previous jump range allows.
		if (!dp[i]) return false;
		// For all positions we can reach given the range
		// at nums[i], set the corresponding positions in
		// dp to true.
		for (let j = 1; j <= nums[i]; j++) {
			dp[i + j] = true;
		}
	}

	return dp[nums.length - 1] ? true : false;
};
```

### Better Approach: Greedy Algorithm

This greedy alogorithm is a much faster $O(n)$ time complexity. It optimistically keeps track of the farthest index you can reach in the `nums` array based on what you've seen so far. If, while iterating over `nums`, you hit an index greater than the farthest you've been able to reach so far, then you know you'll never reach the end and can return `false`.

```typescript
function canJump(nums: number[]): boolean {
	// I can get away with naming my jump range variable
	// "range" because JavaScript has no `range` function!
	// (I weep softly and dream of Python...)
	let range = 0;
	for (let i = 0; i < nums.length; i++) {
		if (range < i) return false;
		range = Math.max(nums[i] + i, range);
	}
	return true;
};
```
