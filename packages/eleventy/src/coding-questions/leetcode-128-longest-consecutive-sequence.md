---
title: 128. Longest Consecutive Sequence
description: Given an unsorted array of integers, return the length of the longest consecutive elements sequence in O(n) time.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/longest-consecutive-sequence/)

Given an unsorted array of integers `nums`, return _the length of the longest consecutive elements sequence_.

You must write an algorithm that runs in `O(n)` time.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

Example 2:

```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```
</details>

<details>
<summary>Constraints</summary>


- <code>0 <= nums.length <= 10<sup>5</sup></code>
- <code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code>

</details>

## My Solution

### Depth First Search

```typescript
function longestConsecutive(nums: number[]): number {
	if (nums.length === 0) return 0;
	const map: Map<number, number> = new Map();
	nums.forEach(num => map.set(num, 0));

	function dfs(digit: number) {
		let result = 0;
		if (map.has(digit + 1) && map.get(digit + 1) === 0) {
			map.set(digit + 1, 1);
			result += 1 + dfs(digit + 1);
		}
		if (map.has(digit - 1) && map.get(digit - 1) === 0) {
			map.set(digit - 1, 1);
			result += 1 + dfs(digit - 1);
		}
		return result;
	}

	let result = 1;

	nums.forEach(num => {
		if (map.get(num) === 0) {
			result = Math.max(result, dfs(num));
		}
	})

	return result;
};
```
