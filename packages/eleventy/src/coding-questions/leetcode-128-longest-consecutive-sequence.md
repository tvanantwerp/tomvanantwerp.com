---
title: LeetCode 128. Longest Consecutive Sequence
description: Given an unsorted array of integers, return the length of the longest consecutive elements sequence in O(n) time.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/longest-consecutive-sequence/)

Given an unsorted array of integers `nums`, return _the length of the longest consecutive elements sequence_.

You must write an algorithm that runs in `O(n)` time.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

Example 2:

```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```
</details>

<details>
<summary>Constraints</summary>


- <code>0 <= nums.length <= 10<sup>5</sup></code>
- <code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code>

</details>

## My Solution

### Depth First Search

An efficient way to solve this problem without iterating over the array `nums` any more times than necessary is to use a depth first search. We will create a `Map` of each digit in `nums`, and use that `Map` to keep track of whether we've evaluated a given digit or not as part of a consecutive sequence. Inside our depth first search, we'll increment a result every time we find a consecutive digit in the `nums` array, as well as add the result of depth first search of that consecutive digit. We'll iterate over each number in `nums` and set a final `result` variable equal to the maximum of itself or the result of a depth first search of itself. This will ultimately give us the longest consecutive sequence.

```typescript
function longestConsecutive(nums: number[]): number {
	// Return early if there are no numbers
	if (nums.length === 0) return 0;

	// First, we create a Map for each number in nums.
	// The number will be the key, and the value false.
	// False implies "no, we haven't checked this node".
	const map: Map<number, boolean> = new Map();
	nums.forEach(num => map.set(num, 0));

	// Here we define our depth first search function.
	function dfs(digit: number) {
		let result = 0;
		// First, check if the next highest number exists
		// in the map and if it hasn't been traversed yet.
		// If so, mark it traversed and increment the result
		// by 1 plus the eventual result of all possible
		// next consecutive digits.
		if (map.has(digit + 1) && map.get(digit + 1) === false) {
			map.set(digit + 1, true);
			result += 1 + dfs(digit + 1);
		}
		// Same as above, but going the other way.
		if (map.has(digit - 1) && map.get(digit - 1) === false) {
			map.set(digit - 1, true);
			result += 1 + dfs(digit - 1);
		}

		// By now, result equals the full length of all
		// consecutive numbers in the chain where the digit
		// is a member of that chain. All numbers in that
		// chain are marked as visited, so we won't need
		// to check them again later.
		return result;
	}

	// Initialize our result to 1, since we already
	// bailed if there are no numbers in nums.
	let result = 1;

	// For each number in nums, set the result to the
	// maximum of itself or the result of our depth
	// first search for that number.
	nums.forEach(num => {
		if (map.get(num) === false) {
			result = Math.max(result, dfs(num));
		}
	})

	// Finally, return our result!
	return result;
};
```

This solution has to traverse the array `nums` twice: once to create the `Map`, and once to run the `dfs` function on each number. This gives us time complexity of $O(2n)$, which reduces to just $O(n)$. Space complexity due to our `Map` is $O(n)$.