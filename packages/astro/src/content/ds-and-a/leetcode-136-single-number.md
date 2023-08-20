---
title: 136. Single Number
description: Given a non-empty array of integers, every element appears twice except for one. Find that single one.
---

## The Problem

[Link to original problem on Leetcode](https://leetcode.com/problems/single-number/)

Given a non-empty array of integers, every element appears twice except for one. Find that single one.

**Note**: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

<details>
<summary>Examples</summary>

Example 1:

```
Input: [2,2,1]
Output: 1
```

Example 2:

```
Input: [4,1,2,1,2]
Output: 4
```

</details>

## My Solution

This solution avoids creating anything new in memory, such as another list or hash map to keep track. I don't really want to track numbers--just find the unique one. To make it easier to do this in a single loop over the existing array, I sort it. Then I can just compare each number to its neighbors and return whichever one doesn't have a matching neighbor.

Time complexity of $$O(n)$$ for my operation not counting the sort. I _think_ space complexity is $$O(1)$$, since I created nothing new. Not sure how the sort might affect that, however.

```javascript
const singleNumber = nums => {
	// First sort the numbers so I can loop through only once
	// without creating another array or hashmap
	nums.sort();

	// Once sorted, if the first two don't match, the first number
	// must be the unique one. (The second would have a pair in
	// third position.)
	if (nums[0] !== nums[1]) {
		return nums[0];
	}

	// Loop through sorted nums starting at index 1 and ending at length - 1.
	// We already checked index 0.
	for (let i = 1, j = nums.length - 1; i < j; i++) {
		// If nums[i] doesn't equal either of its neighbors, it is unique.
		if (nums[i - 1] !== nums[i] && nums[i] !== nums[i + 1]) {
			return nums[i];
		}
	}

	// If you get this far, the final number must be unique.
	return nums[nums.length - 1];
};
```

## Best Solution

Use bitwise operations. The XOR of number _n_ and 0 is _n_. Therefore, _n_ XOR _n_ is 0.

If you XOR each number in the array together, all the duplicates cancel out.

Time complexity of O(N) and space complexity of O(1).

```javascript
const singleNumber = nums => {
	return nums.reduce((result, num) => result ^ num);
};
```
