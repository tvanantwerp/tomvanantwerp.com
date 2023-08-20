---
title: LeetCode 152. Maximum Product Subarray
description: Given an integer array, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
tags:
  - Dynamic Programming
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/maximum-product-subarray/)

Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return _the product_.

The test cases are generated so that the answer will fit in a **32-bit** integer.

A **subarray** is a contiguous subsequence of the array.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

Example 2:

```
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

</details>

<details>
<summary>Constraints</summary>

- 1 <= `nums.length` <= 2 \* 10<sup>4</sup>
- -10 <= `nums[i]` <= 10
- The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
</details>

## My Solution

Much like [053 Maximum Subarray](/coding-questions/leetcode-053-maximum-subarray), we can use dynamic programming with [Kadane's Algorithm](https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's_algorithm) to solve this in $$O(n)$$ time. Check out the solution to that problem for a full explanation of the algorithm and what it's superior to a naïve approach.

In this implementation, we have to keep track not only of the current maxium number so far, but also the minimum so far. This is because we can have negative numbers, and two negatives multiplied could give us a larger number than the product of the current number and the current maximum.

```javascript
const maxProduct = nums => {
	let numberTimesMax,
		numberTimesMin,
		currentMax = nums[0],
		currentMin = nums[0],
		best = nums[0];
	for (let i = 1; i < nums.length; i++) {
		// We keep these numberTimesMax and numberTimesMin
		// variables because both values are needed to update
		// currentMax and currentMin. We couldn't successfully
		// updated currentMin if currentMax had already been
		// altered. You could do this with only a numberTimesMax
		// variable, but I like the readability of using both.
		numberTimesMax = currentMax * nums[i];
		numberTimesMin = currentMin * nums[i];
		currentMax = Math.max(numberTimesMax, numberTimesMin, nums[i]);
		currentMin = Math.min(numberTimesMax, numberTimesMin, nums[i]);
		best = Math.max(currentMax, best);
	}
	return best;
};
```

Credit to [AmehPls](https://leetcode.com/AmehPls) for his [thorough explanation of his own implementation](<https://leetcode.com/problems/maximum-product-subarray/discuss/1598311/Javascript-Solution-using-Dynamic-Programming-in-O(n)-time-(w-explanation)>), which I used to update my own from [problem 53](/coding-questions/leetcode-053-maximum-subarray).
