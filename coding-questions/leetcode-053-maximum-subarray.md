---
title: 053. Maximum Subarry
description: Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
tags:
  - Dynamic Programming
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/maximum-subarray/)

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return *its sum*.

Example 1:

```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

Example 2:

```
Input: nums = [1]
Output: 1
```

Example 3:

```
Input: nums = [0]
Output: 0
```

Example 4:

```
Input: nums = [-1]
Output: -1
```

Example 5:

```
Input: nums = [-100000]
Output: -100000
```
 

Constraints:

- 1 <= `nums.length` <= 3 * 10<sup>4</sup>
- -10<sup>5</sup> <= `nums[i]` <= 10<sup>5</sup>

 
Follow up: If you have figured out the $O(n)$ solution, try coding another solution using the divide and conquer approach, which is more subtle.


## My Solution

### Naive Approach

The worst thing I can think of would be to compute the sum of every conceivable subarray. This would be $O(n{^3})$ time complexity and $O(1)$ space complexity.

```javascript
// Bad, don't do this
const maxSubArray = function(nums) {
    let sum = nums[0];
    
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            // I'm using slice and reduce to get the subarray sum
            // instead of writing a third for loop, because why not?
            const newSum = nums
                .slice(i, j + 1)
                .reduce((acc, curr) => {
                    return acc + curr;
                }, 0);
            
            sum = Math.max(sum, newSum);
        }
    }
    
    return sum;
};
```

This code passed Leetcode's example test cases, but times out when submitted. No surprises there!

It can be improved to $O(n{^2})$ time by noticing that we don't need to compute each piece of each subarry. For example, with an array `[2, 5, -3, 4]`, I would start with `2`, `2+5`, then `2+5-3`, then `2+5-3+4` for the first loop of `i`. See how I recompute every value every time? Instead, I could do it as `2`, `2+5`, `7-3`, `4+4`. Here's what that would look like:

```javascript
// Better but still bad, don't do this either
const maxSubArray = function(nums) {
    let sum = nums[0];
    
    for (let i = 0; i < nums.length; i++) {
        let leftSideSum = 0;
        for (let j = i; j < nums.length; j++) {
            leftSideSum += nums[j];
            sum = Math.max(sum, leftSideSum);
        }
    }
    
    return sum;
};
```

### Kadane's Algorithm

I did some research and found [Kadane's algorithm](https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's_algorithm) for solving this problem in $O(n)$ time. It breaks the problem down into the question: would I get a higher sum by continuing the largest subarry ending at index `i - 1`, or just starting a new subarry at `i`? To do this, it keeps track of the best sum we've seen so far and the best subarray sum ending at `i`. No lie, this took some time to wrap my head around. Here's an implementation.

```javascript
// Much improved, could do this
const maxSubArray = function(nums) {
    let current = -Infinity, best = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        best = Math.max(best, current);
    }
    return best;
};
```

