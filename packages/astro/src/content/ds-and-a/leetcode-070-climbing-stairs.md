---
title: LeetCode 70. Climbing Stairs
description: You are climbing a staircase with a certain number of steps. With each step, you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/climbing-stairs/)

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

<details>
<summary>Examples</summary>

Example 1:

```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

Example 2:

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

</details>

<details>
<summary>Constraints</summary>

1 ≤ `n` ≤ 45

</details>

## My Solution

Looking at the examples should hopefully give a clue: we're dealing with a Fibonacci sequence!

If we've got one step, then there's one way to climb it—in a single step. Two steps, two ways: step once two times, or step twice one time. Three steps, and we can step once three times, or one step one time and two steps one time and vice versa for three total unique step sequences. Below is a breakdown of this pattern for a few more numbers:

```
n = 0 => 0
n = 1 => 1
  1 step
n = 2 => 2
  1 step + 1 step
  2 steps
n = 3 => 3
  1 + 1 + 1
  2 + 1
  1 + 2
n = 4 => 5
  1 + 1 + 1 + 1
  1 + 1 + 2
  1 + 2 + 1
  2 + 1 + 1
  2 + 2
n = 5 => 8
  1 + 1 + 1 + 1 + 1
  1 + 1 + 1 + 2
  1 + 1 + 2 + 1
  1 + 2 + 1 + 1
  2 + 1 + 1 + 1
  2 + 2 + 1
  2 + 1 + 2
  1 + 2 + 1
...
```

In this Fibonacci sequence, the `n`th value in the sequence is equal to the sum of the previous two values. In mathematical terms, $F_{n} = F_{n - 1} + F_{n - 2}$. So if we know $F_{n - 1}$ and $F_{n - 2}$, we know $F_{n}$. Easy enough to calculate!

```javascript
const climbStairs = n => {
	// No point calculating these low numbers
	if (n <= 2) return n;

	// Let's assume we start counting from step 3,
	// so the step before F[n - 1] (or n1) has 2 ways
	// and the one before that F[n - 2] (or n2) has
	// only one way.
	let n1 = 2;
	let n2 = 1;
	// We'll be setting the value of the nth step in our loop,
	// so initialize to zero for now.
	let sum = 0;
	// We could store the values in an array and access
	// them by index, but that creates O(n) space
	// complexity that we don't actually need.

	for (let i = 3; i <= n; i++) {
		// F[n] = F[n - 1] + F[n - 2]
		sum = n1 + n2;
		// Reset the step two back to be the step one back
		n2 = n1;
		// Reset the step one back to be this step
		n1 = sum;
	}

	return sum;
};
```

We can also solve this recursively (with memoization as an added bonus):

```javascript
const climbStairs = (
	n,
	memo = new Map([
		[1, 1],
		[2, 2],
	]),
) => {
	if (memo.has(n)) return memo.get(n);
	memo.set(n, climbStairs(n - 1, memo) + climbStairs(n - 2, memo));
	return memo.get(n);
};
```
