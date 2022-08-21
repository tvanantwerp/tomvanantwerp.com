---
title: LeetCode 189. Rotate Array
description: Given an array, rotate the array to the right by k steps, where k is non-negative.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/rotate-array/)

Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.

**Follow up**:

- Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
- Could you do it in-place with $O(1)$ extra space?

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]

Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

Example 2:

```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]

Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```
</details>

<details>
<summary>Constraints</summary>

- 1 <= `nums.length` <= 2 * 10<sup>4</sup>
- -2<sup>31</sup> <= `nums[i]` <= 2<sup>31</sup> - 1
- 0 <= k <= 10<sup>5</sup>
</details>

## My Solution

### Naïve Approach

Never hurts to start with a good brute-forcing. For each rotation `k`, loop through the array `num` and shift everything right by one. This will rotate the array with $O(n \times k)$ time complexity.

```javascript
// Bad solution, don't use this
const rotate = (nums, k) => {
    // First, get k down to a manageable size to avoid
    // needlessly rotating the whole array multiple times
    // for large values of k
    k = k % nums.length;

    for (let j = 0; j < k; j++) {
        let previous = nums[nums.length - 1];
        for (let i = 0; i < nums.length; i++) {
            const newPrevious = nums[i];
            nums[i] = previous;
            previous = newPrevious;
        }
    }

    // Instructions are to modify in place, so nothing returned.
};
```

### JavaScript Array Functions

JavaScript's `splice` function can be a little weird, but useful once you know how it works. Here we greatly speed up the array shifting by lopping off from the end of the `nums` array and inserting it to the front.

I think it would've been cleaner to `splice` off the end, then `push` the remaining `nums` to the end of that splice—but, despite `console.log(nums)` reading correctly after doing this, Leetcode's solution checker didn't like that.

I'm sure the fact that I didn't write some elaborate algorithm to do this is a violation of the spirit of Leetcode. Time complexity should be $O(n)$.

```javascript
const rotate = (nums, k) => {
    k = k % nums.length;

    // Splice can delete and insert!
    // The inner splice deletes from nums
    // starting at the index of nums.length - k,
    // and running to the end.
    // The outer splice starts at index 0, deletes 0
    // items, then inserts the spread out returned
    // value of the inner splice.
    nums.splice(0,0,...nums.splice(nums.length - k));
};
```
