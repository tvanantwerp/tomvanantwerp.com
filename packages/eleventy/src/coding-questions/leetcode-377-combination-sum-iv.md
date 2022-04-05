---
title: 377. Combination Sum IV
description: Given an array of distinct integers and a target integer, return the number of possible combinations that add up to target.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/combination-sum-iv/)

Given an array of **distinct** integers `nums` and a target integer `target`, return the _number of possible combinations that add up to_ `target`.

The test cases are generated so that the answer can fit in a **32-bit** integer.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
```

Example 2:

```
Input: nums = [9], target = 3
Output: 0
```
</details>

<details>
<summary>Constraints</summary>


- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- All the elements of `nums` are **unique**.
- `1 <= target <= 1000`

</details>

## My Solution


