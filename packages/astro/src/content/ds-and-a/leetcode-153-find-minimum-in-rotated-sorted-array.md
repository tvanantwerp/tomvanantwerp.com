---
title: LeetCode 153. Find Minimum in Rotated Sorted Array
description: Given a sorted rotated array of unique elements, return the minimum element of this array in logarithmic time.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7] `might become:

- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return _the minimum element of this array_.

You must write an algorithm that runs in $O(\log n)$ time.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

Example 2:

```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

Example 3:

```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

</details>

<details>
<summary>Constraints</summary>

- `n == nums.length`
- 1 <= `n` <= 5000
- -5000 <= `nums[i]` <= 5000
- All the integers of nums are unique.
- `nums` is sorted and rotated between `1` and `n` times.
</details>

## My Solution

The naïve solution would be `return Math.min(...nums)`. This is $O(n)$ time, because it has to check every value in the `nums` array. We can instead use a modified binary search to get down to $O(\log n)$ time. Leetcode has [a more detailed explanation](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/solution/) with the problem on their site.

This first example uses recursion.

```javascript
const findMin = nums => {
	// If there's one value, return it.
	// If the first value is less than the last,
	// the array is sorted. Return the first value.
	if (nums.length === 1 || nums[0] < nums[nums.length - 1]) {
		return nums[0];
	}

	// Find the mid-point of the array.
	const mid = Math.floor(nums.length / 2);

	// If the mid-point is greater than the value to it's right,
	// then that right value is the lowest. Return it.
	if (nums[mid] > nums[mid + 1]) {
		return nums[mid + 1];
	}
	// Likewise, if the mid-point is less than the value to the
	// left, then the mid-point is the lowest value. Return it.
	if (nums[mid - 1] > nums[mid]) {
		return nums[mid];
	}

	// If none of the previous conditions work, we'll
	// recursively call the function on a portion of the array.
	// If the first value is less than the mid-point, then the
	// lowest value must still be on the right-hand side.
	// Call the function again with the subarray of everything
	// to the right of the mid-point.
	// Otherwise, it's in the left-hand side.
	if (nums[0] < nums[mid]) {
		return findMin(nums.slice(mid + 1));
	} else {
		return findMin(nums.slice(0, mid));
	}
};
```

This problem can also be solved without recursively calling the function. Instead, we use a `while` loop. This solution is, in my aesthetic opinion, superior to the first.

```javascript
const findMin = nums => {
	// Set left and right to the start and end indices of nums.
	// The result will eventually be stored in the left variable.
	let left = 0;
	let right = nums.length - 1;

	// Since an array with length 1 won't satisfy this condition,
	// it skips straight to returning nums[left], which is nums[0]
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] > nums[right]) {
			// If the mid-point is greater than the value at index
			// right, then we know the lowest value is on the right
			// side of the array. Set the left-most index to the
			// mid-point.
			left = mid + 1;
		} else {
			// Otherise, it must be on the left side. Set the new
			// right-most index to the mid-point.
			right = mid;
		}
	}

	// Eventually, nothing will remain but the lowest value
	// at the left-most index.
	return nums[left];
};
```
