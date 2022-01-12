---
title: 371. Sum of Two Integers
description: Given two integers a and b, return the sum of the two integers without using the operators + and -.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/sum-of-two-integers/)

Given two integers `a` and `b`, return _the sum of the two integers without using the operators_ `+` _and_ `-`.

<details>
<summary>Examples</summary>

Example 1:

```
Input: a = 1, b = 2
Output: 3
```

Example 2:

```
Input: a = 2, b = 3
Output: 5
```
</details>

<details>
<summary>Constraints</summary>

- -1000 <= `a, b` <= 1000
</details>

## My Solution

To add two numbers without `+` or `-`, we'll use binary. I mainly write JavaScript for web application, which means I use bitwise operations approximately never. But I'll endeavor to explain it.

```javascript
const getSum = (a, b) => {
    return b ? getSum(a ^ b, (a & b) << 1) : a;
};
```

