---
title: LeetCode 217. Contains Duplicate
description: Given an integer array, return true if any value appears at least twice in the array, and return false if every element is distinct.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/contains-duplicate/)

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [1,2,3,1]
Output: true
```

Example 2:

```
Input: nums = [1,2,3,4]
Output: false
```

Example 3:

```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

</details>

<details>
<summary>Constraints</summary>

- 1 <= `nums.length` <= 10<sup>5</sup>
- -10<sup>9</sup> <= `nums[i]` <= 10<sup>9</sup>
</details>

## My Solution

This solution is $O(n)$ time and space complexity. I iterate through `nums` and store each unique value in a `Map`. If I encounter a value is already in the `Map`, I return `true`. If I add every item to the `Map` without encountering a duplicate, I return `false`.

```javascript
const containsDuplicate = nums => {
	const map = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (map.has(nums[i])) {
			return true;
		}
		map.set(nums[i], i);
	}
	return false;
};
```

Another solution would be to create a `Set` from `nums` and compare the sizes to each other. I initially chose the `Map` approach, as using a `Set` gaurantees traversing the entire `nums` array without the ability to `return` early. I'm not the only one who thought this, and found this useful comparison (with `Object`s instead of `Map`s) [here](https://leetcode.com/problems/contains-duplicate/discuss/515531/Javascript-set-vs.-object).

```javascript
const containsDuplicate = nums => {
	const set = new Set(nums);
	return set.size !== nums.length;
};
```
