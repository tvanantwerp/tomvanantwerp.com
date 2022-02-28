---
title: 300. Longest Increasing Subsequence
description: 
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/longest-increasing-subsequence/)

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

A **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.

**Follow up**: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

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
    return Math.max(
        skip,
        (nums[i] > previous) ? accept : 0
    )
};
```

This is a functional solution, but a rather bad one. Because we're comparing two possible paths at every iteration of the loop, we're creating $O(2^{n})$ time complexity. If you actually plug this solution into LeetCode, it will timeout before solving. We must do better.

### Better Solution: Dynamic Programming