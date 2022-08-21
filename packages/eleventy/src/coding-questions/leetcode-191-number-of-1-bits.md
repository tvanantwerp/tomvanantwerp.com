---
title: LeetCode 191. Number of 1 Bits
description: Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/number-of-1-bits/)

Write a function that takes an unsigned integer and returns the number of `1` bits it has (also known as the [Hamming weight](http://en.wikipedia.org/wiki/Hamming_weight)).

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

So, first of all, leetcode lies—it does not pass a binary string to the function (at least not when I write it in JavaScript), but passes a regular 'ole number. Had they actually used a string, I would've first converted it to an integer with `parseInt(n, 2)`, where `n` is the binary string and `2` is the radix, or numeral base, I want to convert to.[^1]

A naïve way to solve this would be to use bit shifting. We could compare `n` to `1` with AND, add the result to a counter, then shift `n` to the right. This will examine each bit in the number. Take `1011` for example.

```
count = 0

  1011
& 0001
------
  0001 => add 1 to count

  0101
& 0001
------
  0001 => add 1 to count

  0010
& 0001
------
  0000 => add 0 to count

  0001
& 0001
------
  0001 => add 1 to count

count === 3
```

In code:

```javascript
const hammingWeight = (n) => {
	let count = 0;
	while (n) {
		count += n & 1;
		// Note: in JavaScript, use >>> for unsigned binary
		// integer shifting. For a signed 32-bit integer, a
		// negative number is marked with a 1 in the first
		// position. Using >> will preserve that one, causing
		// an infinite loop!
		n = n >>> 1;
	}
	return count;
};
```

Another more efficient way to solve this problem is by comparing `n` with `n - 1` using AND. Every time you do this, mutate `n` to equal the result and increment a counter until `n` equals `0`. What this does is clear the least significant digit with each iteration, meaning we only iterate as many times as there are `1`'s. Here's how this would look with the example `1011`.

```
First loop
  1011 => n, which is 11
& 1010 => n - 1, which is 10
------
  1010 => set n to this
  count += 1

Second loop
  1010 => n
& 1001 => n - 1
------
  1000 => set n to this
  count += 1

Third loop
  1000 => n
& 0111 => n - 1
------
  0000 => n === 0, we can stop after this loop
  count += 1
```

Once `n` is zero, we've incremented our `count` variable once for each instance of a `1` in the binary representation of `n`. Each time we mutated `n`, we were setting it to it's previous binary value but with the smallest `1` bit set to `0` instead. (E.g., `1011` to `1010` to `1000` and finally to `0000`.) In code:

```javascript
const hammingWeight = (n) => {
	let count = 0;
	while (n) {
		n = n & (n - 1);
		count++;
	}
	return count;
};
```

You can also write this recursively:

```javascript
const hammingWeight = (n) => {
	return n ? hammingWeight(n & (n - 1)) : 0;
}
```

[^1]: Ok, now I'm lying. If it were a string, I would've just written `n.split('').reduce((p, c) => c === '1' ? p + 1 : p, 0)` and called it a day.