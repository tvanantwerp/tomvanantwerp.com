---
title: LeetCode 338. Counting Bits
description: Given an integer, return an array of the number of 1 bits in each digit from 0 through the integer.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/counting-bits/)

Given an integer `n`, return _an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is **the number of `1`'s** in the binary representation of `i`_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
```

Example 2:

```
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

</details>

<details>
<summary>Constraints</summary>

0 <= `n` <= 10<sup>5</sup>

</details>

<details>
<summary>Follow up</summary>

- It is very easy to come up with a solution with a runtime of $O(n \log n)$. Can you do it in linear time $O(n)$ and possibly in a single pass?
- Can you do it without using any built-in function (i.e., like `__builtin_popcount` in C++)?

</details>

## My Solution

The problem is very simple if you've already got a solution to [191. Number of 1 Bits](/coding-questions/leetcode-191-number-of-1-bits/). All you need to do is loop over the numbers from `0` through `n`, computer the Hamming Weight, and push that to an array to be returned.

```javascript
// To understand what this function is doing, see the
// explanation linked in the preceding paragraph.
const hammingWeight = n => {
	let count = 0;
	while (n) {
		n = n & (n - 1);
		count++;
	}
	return count;
};

const countBits = n => {
	const result = [];
	for (let i = 0; i <= n; i++) {
		result.push(hammingWeight(i));
	}
	return result;
};
```

Ok, so that's easy. Copy and paste! But can we do better? Yes, we can!

With the above example, we have to count the `1`s from scratch for each value of `i`. But we can actually use previous computations in our loop over `i` to save us the trouble!

Think about the even numbers in binary. `10`, `100`, `110`, `1000`, etc. Notice that the final digit is always zero. If you shift the bits right by one, the count of `1`s in the number does not change because you've only ever lopped off a `0`.

The other thing to notice is that shifting each even number to the right by 1 bit is equivalent to dividing by `2`. E.g., `1000 >> 1 === 100` is the same as `8 / 2 === 4`. So if we want to know how many `1`s are in `8`, we can go back to our previous count of how many `1`s are in `4`. This means that we can look back in our own results array for the value at the index of half the current number and find the count of `1`s not including the final digit. To then account for the final digit, we use AND comparison to see if it is a `1` or a `0`. Putting it all together:

```javascript
const countBits = n => {
	const result = [0];
	for (let i = 0; i <= n; i++) {
		result[i] = result[i >> 1] + (i & 1);
	}

	return result;
};
```
