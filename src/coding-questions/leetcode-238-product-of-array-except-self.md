---
title: 238. Product of Array Except Self
description: Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/product-of-array-except-self/)

Given an integer array `nums`, return an _array_ `answer` such that `answer[i]` _is equal to the product of all the elements of_ `nums` _except_ `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in $O(n)$ time and without using the division operation.

Example 1:

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

Example 2:

```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

Constraints:

- 2 <= `nums.length` <= 10<sup>5</sup>
- -30 <= `nums[i]` <= 30
- The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

**Follow up**: Can you solve the problem in $O(1)$ extra space complexity? (The output array does not count as extra space for space complexity analysis.)

## My Solution

### Ignoring the Instructions

This would be fairly easy without the caveat "without using the division operation". If division were allowed, you could just compute the product of all `nums` values and then return `nums.map(num => numsProduct / num)`.[^1] But alas, we must do something more complicated.

[^1]: Ok, it would be _a bit_ more complicated than this. If `nums` contained two or more `0`s, the answer is just an array of `0`s with the same length as `nums`. If there is exactly one `0`, then everything in the answer array is `0` _except_ for the index of that `0`, which should be the product of all other numbers. Take care not to divide by zero!