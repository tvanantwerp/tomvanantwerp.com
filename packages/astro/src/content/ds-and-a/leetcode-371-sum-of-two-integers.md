---
title: LeetCode 371. Sum of Two Integers
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

To add two numbers without `+` or `-`, we'll use binary. I mainly write JavaScript for web application, which means I use bitwise operations approximately never. But hey, that's leetcode!

Anyway, bitwise operations include:

- `&`, AND, which returns `1` if two compared bits are both `1`
- `|`, OR, which returns `1` if either compared bit is `1`
- `~`, NOT, which returns the opposite of a given bit
- `^`, XOR (exclusive or), which returns `1` if two bits are `0` and `1`, but returns `0` if both bits are either `0` or `1`
- `<<` shift bits to the left, e.g., `0110` to `1100`
- `>>` shift bits to the right, e.g., `0110` to `0011`

So, how can we use this information to find the sum of integers?

First, let's think of an example pair of integers: `7` and `4`. In binary, they can be represented as `0111` and `0100`. Adding in binary works the same as adding in base ten:

```
  0111 => 7
+ 0100 => 4
------
  1011 => 11
```

From this simple example, we can see that for each digit, a `0` and a `1` will have a `1` in the result. Two `0`'s result in a `0`, and two `1`'s result in a `0` and a carried `1` to the next place.

This means two things:

- We can find the value for a given digit with XOR
- We need a way to carry over the `1` when there are two `1`'s being added

We can figure out where we'll need carried digits with AND. Then to get them into the right position, we'll have to shift them left. In our example:

```
  0111
& 0100
------
  0100 <= the 4's digit is where a 1 will need to carry over

  0100
<<   1
------
  1000 <= Shifting left by one bit, the carried bit is in the right place
```

Now that we know were our carried digits will go, we can go ahead and find the the digits that should come out to `1` with XOR.

```
  0111
^ 0100
------
  0011
```

We're close, but remember, we can't use `+` here! We can't say `1000 + 0011 = 1011` and be done with it. Instead, we'll change the values of our original variables with our new results.

First, find the digits to carry:

```
  0011 => 7 ^ 4
& 1000 => (7 & 4) << 1
------
  0000 <= nothing left to carry over!
```

Now we find the digits that will equal `1` using XOR:

```
  0011 => 7 ^ 4
^ 1000 => (7 & 4) << 1
------
  1011 => 11, our answer!
```

Time to translate this to code. We're going to want a variable to keep track of digits to carry, and a loop to continue executing these steps until we've got our answer. Note that in our example, our carried over digits ended up at `0`—we can use that as a conditional for our loop to know when to stop.

In our function, we're passed to integers, `a` and `b`. We can mutate them to keep track of our intermediate steps. Let's store the XOR'ed values (and ultimately, our answer) in `a`, and our carried over values in `b`. We need to have a third variable to store the carried values, because we can't find out what they should be from `a` and `b` if we've already mutated `a` to equal `a ^ b`.

```javascript
const getSum = (a, b) => {
	let carry;
	// When there are no digits left to carry, b will
	// equal 0 and a will equal our answer.
	while (b !== 0) {
		// Store the digits we'll need to carry over.
		carry = a & b;
		// Find the digits that will equal 1 in binary,
		// then mutate a to equal the result.
		a = a ^ b;
		// Mutate b to equal the carried digits, shifted
		// once to the left.
		b = carry << 1;
	}
	return a;
};
```

You can also write this code more pithily with recursion like so:

```javascript
const getSum = (a, b) => {
	return b ? getSum(a ^ b, (a & b) << 1) : a;
};
```
