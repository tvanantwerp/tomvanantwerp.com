---
title: 191. Number of 1 Bits
description: Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/number-of-1-bits/)

Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the [Hamming weight](http://en.wikipedia.org/wiki/Hamming_weight)).

<details>
<summary>Notes</summary>

- Note that in some languages, such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
- In Java, the compiler represents the signed integers using [2's complement notation](https://en.wikipedia.org/wiki/Two%27s_complement). Therefore, in Example 3, the input represents the signed integer. `-3`.
</details>

<details>
<summary>Examples</summary>

Example 1:

```
Input: n = 00000000000000000000000000001011
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
```

Example 2:

```
Input: n = 00000000000000000000000010000000
Output: 1
Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.
```

Example 3:

```
Input: n = 11111111111111111111111111111101
Output: 31
Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.
```
</details>

<details>
<summary>Constraints</summary>

- The input must be a **binary string** of length `32`.
</details>

## My Solution

So, first of all, leetcode lies—it does not pass a binary string to the function (at least not when I write it in JavaScript), but passes a regular 'ole number. Had they actually used a string, I would've first converted it to an integer with `parseInt(n, 2)`, where `n` is the binary string and 2 is the radix, or numeral base, I want to convert to.


