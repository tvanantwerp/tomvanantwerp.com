---
title: LeetCode 283. Move Zeroes
description: Given an array, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/move-zeroes/)

Given an array `nums`, write a function to move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.

<details>
<summary>Example</summary>

```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```
</details>

**Note**:

1. You must do this in-place without making a copy of the array.
2. Minimize the total number of operations.

## My Solution

This $O(n)$ time solution uses two variables, `i` and `j`, in a `for` loop. The first, `i`, is used to actually count iterations and stop before hitting the array's length. The second, `j`, keeps track of which index in the constantly mutating `nums` array you're currently looking at.

Every time `nums[j]` is a `0`, it gets `splice`d out and `push`ed to the end. Everything that was after `nums[j]` will shift ahead by `1` index value, so `j` is decremented by `1` to make sure we're look at what came after that `0` instead of what was two places after it. After `i` iterations, we can safely assume we've checked the entire `nums` array.

```javascript
const moveZeroes = (nums) => {
    for (let i = 0, j = 0; i < nums.length; i++, j++) {
        if (nums[j] === 0) {
            nums.push(nums.splice(j, 1));
            j--;
        }
    }
};
```