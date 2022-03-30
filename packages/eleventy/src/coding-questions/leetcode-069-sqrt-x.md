---
title: 69. Sqrt(x)
description: Given a non-negative integer, compute and return the square root.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/sqrtx/)

Given a non-negative integer `x`, compute and return the square root of `x`.

Since the return type is an integer, the decimal digits are **truncated**, and only **the integer part** of the result is returned.

**Note**: You are not allowed to use any built-in exponent function or operator, such as `pow(x, 0.5)` or `x ** 0.5`.

<details>
<summary>Examples</summary>

Example 1:

```
Input: x = 4
Output: 2
```

Example 2:

```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
```
</details>

<details>
<summary>Constraints</summary>

0 ≤ `x` ≤ 2<sup>31</sup> - 1
</details>

## My Solution

### The Cheating Answer

You are explicitly told in the problem not to do it this way. That said...

```typescript
function mySqrt(x: number): number {
	// Cheater!
	return Math.floor(x ** 0.5);
};
```

### Binary Search

One approach to finding the square root (rounded down to an integer) is with a binary seach. We'll start with `x / 2` as our `mid`-point, and update our bounds based on how it compares to `x / mid`. Either we eventually hit on a perfect square where `mid === x / mid`, or we end up returning the upper-bound.

```typescript
function mySqrt(x: number): number {
	// return 0 if x is 0
	if (x === 0) return 0;

	// else, we do a binary search for the nearest int sqrt
	let low = 0, high = x;;

	while (low <= high) {
		const mid = Math.floor(low + (high - low) / 2);

		if (mid === x / mid) return mid;

		if (mid < x / mid) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	return high;
};
```

### Newton's Iterative Method

