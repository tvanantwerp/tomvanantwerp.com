---
title: LeetCode 1. Two Sum
description: Given an array of integers and a target sum, return indices of two numbers in array that add to the target sum.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/two-sum/)

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **_exactly_ one solution**, and you may not use the same element twice.

You can return the answer in any order.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

Example 2:

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

Example 3:

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

</details>

<details>
<summary>Constraints</summary>

- 2 <= `nums.length` <= 10<sup>3</sup>
- -10<sup>9</sup> <= `nums[i]` <= 10<sup>9</sup>
- -10<sup>9</sup> <= `target` <= 10<sup>9</sup>
- Only one valid answer exists.
</details>

## My Solution

### Naïve Solution

The simplest approach is nested for loops, solving in $O(n{^2})$ time and $O(1)$ space.

```javascript
const twoSum = (nums, target) => {
	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < nums.length; j++) {
			if (i !== j && nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
	}
};
```

### Best Solution

We can reduce the time complexity to $O(n)$ by increasing the space complexity to $O(n)$ in the form of a hashmap. Here I use a JavaScript object to keep track of numbers I've seen and their indices.

```javascript
const twoSum = (nums, target) => {
	let reference = {};
	for (let i = 0, j = nums.length; i < j; i++) {
		if (target - nums[i] in reference) {
			return [reference[target - nums[i]], i];
		}
		reference[nums[i]] = i;
	}
};
```

You could also use the newer built-in `Map` in JavaScript.

```javascript
const twoSum = (nums, target) => {
	let complements = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (complements.has(target - nums[i])) {
			return [complements.get(target - nums[i]), i];
		}
		complements.set(nums[i], i);
	}
};
```
