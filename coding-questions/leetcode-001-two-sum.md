---
title: 001. Two Sum
description: Given an array of integers and a target sum, return indices of two numbers in array that add to the target sum.
tags:
  - Coding Questions
layout: layouts/writing.liquid
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/two-sum/)

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have ***exactly* one solution**, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

Example 2:

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

Example 3:

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

Constraints:

- 2 <= `nums.length` <= 10<sup>3</sup>
- -10<sup>9</sup> <= `nums[i]` <= 10<sup>9</sup>
- -10<sup>9</sup> <= `target` <= 10<sup>9</sup>
- Only one valid answer exists.


## My Solution

I've done this one a few times. This is the oldest solution I found, and it's a doozy.

```javascript
const twoSum = (nums, target) => {
    let list = [nums[0]]
    for (let i = 1, j = nums.length; i < j; i++) {
        for (let k = 0, l = list.length; k < l; k++) {
            if (nums[i] + list[k] === target) {
                return [k, i];
            }
        }
        list.push(nums[i]);
    }
}
```

This solution is bad. I've taken a problem with a single input array and somehow made it take $O(n{^2})$ time and $O(n)$ space. I can only assume I didn't know about hashmaps when I wrote this.

The next attempt I found was much better.

```javascript
const twoSum = function(nums, target) {
  let reference = {};
    for (let i = 0, j = nums.length; i<j; i++) {
        if (target - nums[i] in reference) {
            return [reference[target - nums[i]], i];
        }
        reference[nums[i]] = i;
    }
};
```

Here I use a JavaScript object to keep track of numbers I've seen and their indices. This gets runtime back down to $O(n)$.

My most recent solution is basically the same, except that it uses the newer built-in `Map` in JavaScript.

```javascript
const twoSum = function(nums, target) {
    let complements = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (complements.has(target - nums[i])) {
            return [complements.get(target - nums[i]), i];
        }
        complements.set(nums[i], i);
    }
};
```