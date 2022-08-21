---
title: LeetCode 268. Missing Number
description: Given an array containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
image: img/2022-01-23-missingno.png
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/missing-number/)

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return _the only number in the range that is missing from the array_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
```

Example 2:
```
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
```

Example 3:
```
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
```
</details>

<details>
<summary>Constraints</summary>

- `n` $=$ `nums.length`
- 1 $\le$ `n` $\le$ 10<sup>4</sup>
- 0 $\le$ `nums[i]` $\le$ `n`
- All the numbers of `nums` are **unique**.
</details>

<details>
<summary>Follow up</summary>

Could you implement a solution using only $O(1)$ extra space complexity and $O(n)$ runtime complexity?
</details>

## My Solution

We can solve this problem with the exclusive-or (XOR) bitwise operator. But first, a bit of explanation about using XOR.

First, any number XOR'ed with itself is `0`. Since every bit at every position would be the same, the resulting comparison would never be a `1` versus a `0`, resulting in XOR always returning `0`.

```
Example:

  11011001
^ 11011001
----------
  00000000
```

Second, any number XOR'ed by `0` is the number itself. Since it's really the `1`s in a binary number that make it what it is, comparing a number with XOR to zero means we get `0`s back for `0` to `0` comparisons and `1` for `1` to `0` comparisons.

```
Example:

  11011001
^ 00000000
----------
  11011001
```

Putting these insights together, we now know an interesting new property: any number XOR'ed by a different number that is also XOR'ed by itself gives us the original number. That is, `a ^ b ^ b === a`. Because `b ^ b === 0` and `a ^ 0 === a`. Also, it does not matter what order we perform the operations in. `a ^ b ^ b === a` is no different than `b ^ a ^ b === a`.

With this information, we can now find the missing number with XOR. First, we'll create a variable to hold our result and initialize it to the length of the array. We can take the array of numbers and loop over it, setting the result to itself XOR'ed by the index and the value of nums at that index. For every number that is _supposed_ to occur, we'll inevitably XOR it against an index of equal value. But for whatever number is missing, the index which equals it will never be XORed against itself. Once the loop is over, only that index equal to the missing digit will remain.

```javascript
const missingNumber = (nums) => {
	// Initialize result to the length of nums,
	// since the value of i in the loop won't ever
	// reach this value but a value of nums[i] might.
	let result = nums.length;
	for (let i = 0; i < nums.length; i++) {
		result = result ^ i ^ nums[i];
	}
	return result;
};
```