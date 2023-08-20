---
title: 35. Search Insert Position
description: Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/search-insert-position/)

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with $$O(n \log n)$$ runtime complexity.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

Example 2:

```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

Example 3:

```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

</details>

<details>
<summary>Constraints</summary>

- 1 ≤ `nums.length` ≤ 10<sup>4</sup>
- -10<sup>4</sup> ≤ `nums[i]` ≤ 10<sup>4</sup>
- `nums` contains distinct values sorted in ascending order.
- -10<sup>4</sup> ≤ `target` ≤ 10<sup>4</sup>

</details>

## My Solution

### Binary Search - Iterative

This problem is unambiguously checking to see if you know how to do a binary search. You can use binary search on a sorted array to find a target in $$O(n \log n)$$ time instead of the $$O(n)$$ it would take to check every single item. This is most useful for very large inputs. First, check the mid-point of the array. (Or if it has an even number of values, one adjecent to where the mid-point would be.) If it's the target value, return. If not, compare it to the target. If it's less than the target, check the right half of the array. If it's greater than the target, check the left half of the array. We keep narrowing down the array until we find the target, or we know where the target ought to have been.

```typescript
function searchInsert(nums: number[], target: number): number {
	// First, we establish upper and lower bounds for our
	// search space, starting with 0 and the final index.
	let low = 0,
		high = nums.length - 1;

	while (low <= high) {
		// Find the mid-point, or the number just to the left of
		// where a mid-point would be. Only odd-numbered arrays
		// have an exact mid-point.
		const mid = Math.floor((high + low) / 2);
		// Mid-point of the array equals the target? Return!
		if (nums[mid] === target) return mid;

		// If we haven't found the target this round, we adjust the
		// lower or upper bound of the search space according to the
		// comparison of our mid-point to the target.
		if (nums[mid] > target) {
			high = mid - 1; // The -1 excludes the mid-point itself.
		} else {
			low = mid + 1; // The +1 excludes the mid-point itself.
		}
	}

	// If the target was never found, then our low is now greater
	// than high and we return low. It will be equal to where the
	// target should have been.
	return low;
}
```

### Binary Search - Recursive

You can also implement the solution recursively.

```typescript
function searchInsert(
	nums: number[],
	target: number,
	low = 0,
	high = nums.length - 1,
): number {
	if (low > high) return low;

	const mid = Math.floor((low + high) / 2);
	if (nums[mid] === target) return mid;

	if (nums[mid] > target) {
		return searchInsert(nums, target, low, mid - 1);
	}
	if (nums[mid] < target) {
		return searchInsert(nums, target, mid + 1, high);
	}
}
```
