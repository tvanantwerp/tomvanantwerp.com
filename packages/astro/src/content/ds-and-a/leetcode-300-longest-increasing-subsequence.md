---
title: LeetCode 300. Longest Increasing Subsequence
description: Given an integer array, return the length of the longest strictly increasing subsequence.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/longest-increasing-subsequence/)

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

A **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.

**Follow up**: Can you come up with an algorithm that runs in $$O(n \log n)$$ time complexity?

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```

Example 2:

```
Input: nums = [0,1,0,3,2,3]
Output: 4
```

Example 3:

```
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

</details>

<details>
<summary>Constraints</summary>

- 1 ≤ `nums.length` ≤ 2500
- -10<sup>4</sup> ≤ `nums[i]` ≤ 10<sup>4</sup>
</details>

## My Solution

### Naïve Solution: Brute Force

First we can attempt to brute-force the solution. We can't just go across the array and count every time we encounter a new digit greater than the previous counted digit. We risk missing longer combinations of monotonic subsequences that way. So each step along the way, we have to compare what would happen if we did or did not accept the `i`th digit into our subsequence.

```typescript
// We will recursively go over nums, using the i argument
// which we're initializing to 0. We also initialize a
// previous argument to -Infinity for comparisons.
const lengthOfLIS = (nums: number[], i = 0, previous = -Infinity): number => {
	// If we're past the last element of nums, return 0
	if (i === nums.length) return 0;

	// We use recursion to compute the length of the subsequence
	// if we did skip nums[i] and if we instead accepted it.
	// The +1 in the accept variable represents the increase in
	// subsequence length if we accept the digit.
	const skip = lengthOfLIS(nums, i + 1, previous);
	const accept = 1 + lengthOfLIS(nums, i + 1, nums[i]);

	// Return the greater of the subsequences if we skipped
	// nums[i] or accepted it. Of course, we would only accept
	// if nums[i] is actually greater than the previous value.
	return Math.max(skip, nums[i] > previous ? accept : 0);
};
```

This is a functional solution, but a rather bad one. Because we're comparing two possible paths at every iteration of the loop, we're creating $$O(2^{n})$$ time complexity. If you actually plug this solution into LeetCode, it will timeout before solving. We must do better.

### Excellent Solution: Patience Sorting

We can solve this problem using the [patience sorting](https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf) algorithm. Imagine, instead of an array of numbers, we're dealing from a deck of cards. We create piles from the dealt cards according to a few rules:

1. Piles are arranged left-to-right, and the piles are sorted from smallest to largest.
2. The first card drawn becomes the first card of the first pile.
3. You can only add a card to a pile if it is less than the most recent card in the pile.
4. If the card isn't less than the most recent card in any pile, start a new pile with that card on the farthest right end.
5. You must place cards in the left-most pile in which they can go. E.g., if you had piles with `5` and `8`, and you drew `2`, it would go under the `5` and not the `8`.

So imagine a sequence of cards: `2, 9, 8, 4, J, 5, A`. We would arrange them into piles like so:

```
2	9	J	A
	8	5
	4
```

Once organized, the number of piles is equal to the length of our longest increasing subsequence![^1]

Now that we have this very simple, efficient algorithm, we just need to code it up. To make this simpler, I'm borrowing the answer to [35. Search Insert Position](/coding-questions/leetcode-035-search-insert-position/), in which we wrote a binary search algorithm that returns not just the location of a target in an array, but also the location _it would have had_ if it had been in the array. This will help us place our new values into the correct pile efficiently, since the array of nums could be quite long and an $$O(n)$$ search through our piles with each iteration could get expensive.[^2]

```typescript
function lengthOfLIS(nums: number[]): number {
	// Initialize our "piles" of "cards"
	const piles: number[] = [];
	nums.forEach(num => {
		// If the piles are all empty, start the first pile.
		// Or, if the current value is greater than the
		// most recent value of the furthest-right pile,
		// start a new pile at the end.
		if (piles.length === 0 || piles.at(-1) < num) {
			piles.push(num);
		} else {
			// Otherwise, we need to figure out which pile to
			// place the value in. Here, we'll use a binary
			// search implementation from Problem 35.
			piles[searchInsert(piles, num)] = num;
		}
	});
	return piles.length;
}

// Re-used from problem 35
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

This solution has a time complexity of $$O(n \log n)$$: one $$n$$ for iterating through the array, and $$\log n$$ for the binary search.

[^1]: Note that this implementation does _not_ care that there could be multiple increasing subsequences with the same length. `2, 9, J, A` or `2, 8, J, A` or `2, 4, 5, A` or `2, 4, J, A` are all valid maximally-long increasing subsequences.
[^2]: I like JavaScript, but the standard library could definitely include a few more nice things like a binary search implementation.
