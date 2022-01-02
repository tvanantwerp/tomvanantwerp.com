---
title: 238. Product of Array Except Self
description: Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/product-of-array-except-self/)

Given an integer array `nums`, return an _array_ `answer` such that `answer[i]` _is equal to the product of all the elements of_ `nums` _except_ `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in $O(n)$ time and without using the division operation.

Example 1:

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

Example 2:

```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

Constraints:

- 2 <= `nums.length` <= 10<sup>5</sup>
- -30 <= `nums[i]` <= 30
- The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

**Follow up**: Can you solve the problem in $O(1)$ extra space complexity? (The output array does not count as extra space for space complexity analysis.)

## My Solution

### Ignoring the Instructions

This would be fairly easy without the caveat "without using the division operation". If division were allowed, you could just compute the product of all `nums` values and then return `nums.map(num => numsProduct / num)`.[^1] But alas, we must do something more complicated.

### Bad Solution

Instead of computing total product and dividing by each value, we can compute the product of all the values to the left and all the values on the right and then multiply those.

```javascript
const productExceptSelf = (nums) => {
    return nums.map((_, i) => {
        return product(nums.slice(0, i)) * product(nums.slice(i + 1))
    })
};

const product = nums => nums.reduce((prev, curr) => prev * curr, 1)
```

This is correct, but it is much too slow—it has $O(n{^2})$ time complexity. Leetcode will time out if you try this.

### Better Solution

Computing the products to the left and right by multiplying all of those numbers each time is inefficient. Instead, we can store the result of each previous computation and multiply it by the most recent relevant number only as we move through the `nums` array. We'll store these values as the `prefix` array and the `suffix` array. Since we no longer check each value to the left and right, this brings us down to $O(n)$ time complexity.

```javascript
const productExceptSelf = (nums) => {
    let prefix = [];
    let suffix = [];
    let answer = [];

    // Compute the prefix values by multiplying whatever the previous prefix is by the number to the immediate left of nums[i]
    for (let i = 0; i < nums.length; i++) {
        if (i > 0) {
            prefix[i] = prefix[i - 1] * nums[i - 1]
        } else {
            prefix[i] = 1
        }
    }

    // Loop backwards to compute the suffix values by multiplying the last suffix value computed by the number to the immediate right of nums[i]
    for (let i = nums.length - 1; i >= 0; i--) {
        if (i === nums.length - 1) {
            suffix[i] = 1
        } else {
            suffix[i] = suffix[i + 1] * nums[i + 1];
        }
    }

    // Finally, fill in the answer array by multiplying prefixes and suffixes
    for (let i = 0; i < nums.length; i++) {
        answer[i] = prefix[i] * suffix[i]
    }

    return answer
};
```

### Still Better Solution

The previous solution works, but isn't as space efficient as it could be. We don't actually need to store `prefix` and `suffix` arrays at all!

```javascript
const productExceptSelf = (nums) => {
    // First, initialize the answer array with length equal to nums' length and all values equal to 1.
    const answer = Array.from({length: nums.length}, () => 1);

    // Next, we reset the values in the answer array to serve as our prefix array. Each answer[i] will be equal to the product of all values in nums.slice(0, i).
    for (let i = 1; i < nums.length; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }
    // Finally, we loop backwards to simultaneously update the answer values with suffix products and compute those suffix products. We reduce space complexity by keeping our computations in the answer array rather than storing separate prefix and suffix arrays.
    for (let j = nums.length - 1, suffix = 1; j >= 0; j--) {
        answer[j] *= suffix;
        suffix *= nums[j]
    }
    return answer;
};
```

### Amazing Solution

Can we still improve? Yes! We don't need two separate loops for computing the prefixes and suffixes while filling out the `answer` array.

```javascript
const productExceptSelf = (nums) => {
    const answer = Array.from({length: nums.length}, () => 1);

    for (let i = 0, prefix = 1, suffix = 1; i < nums.length; i++) {
        answer[i] *= prefix;
        prefix *= nums[i];
        answer[nums.length - 1 - i] *= suffix;
        suffix *= nums[nums.length - 1 - i];
    }

    return answer;
};
```

[^1]: Ok, it would be _a bit_ more complicated than this. If `nums` contained two or more `0`s, the answer is just an array of `0`s with the same length as `nums`. If there is exactly one `0`, then everything in the answer array is `0` _except_ for the index of that `0`, which should be the product of all other numbers. Take care not to divide by zero!