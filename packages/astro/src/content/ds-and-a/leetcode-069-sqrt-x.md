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

### Babylonian Method

The [Babylonian Method](https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method) is an ancient algorithm to find approximate square roots. There is a more modern and generalized version called [Newton's Method](https://en.wikipedia.org/wiki/Newton%27s_method), but Newton's Method is identical to the Babylonian Method when applied to a simple square root problem like this.

This algorithm works by taking an initial guess, which we will call `r`. From this starting point, we'll need to continuously update our guess until we reach an arbitrary level of closeness to the true value of the square root. To find the next iteration of the guess, we add our guess `r` to `x / r`, then halve it all. The formula for the next guess is $r_{n + 1} = \frac{r_{n} + \frac{x}{r_{n}}}{2}$. In our case, we'll stop updating and return `r` once `r ** 2` is no longer greater than `x`

```typescript
function mySqrt(x: number): number {
	// First we select a root candidate, and set it to x
	let r = x;

	// We'll loop for as long as our candidate is greater
	// than x / r, which is equivalent to saying r ** 2 - x > 0.
	// Why convert to this form? To avoid the chance of an
	// overflow with r ** 2. Besides, ** is forbidden!
	while (r > x / r) {
		// A lot happening here!
		// We're setting r equal to itself plus x / r, all
		// divided by 2. This reduces r by half, plus half
		// of x / r.
		// The bitwise OR 0 is just a short way to drop remainders.
		// We could've also done Math.floor((r + x / r) / 2).
		r = (r + x / r) / 2 | 0;
	}
	return r;
};
```