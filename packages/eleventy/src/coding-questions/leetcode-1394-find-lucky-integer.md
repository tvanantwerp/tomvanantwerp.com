---
title: LeetCode 1394. Find Lucky Integer in an Array
description: Given an array of integers arr, a lucky integer is an integer which has a frequency in the array equal to its value.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/find-lucky-integer-in-an-array/)

Given an array of integers `arr`, a lucky integer is an integer which has a frequency in the array equal to its value.

Return a *lucky integer* in the array. If there are multiple lucky integers return the **largest** of them. If there is no lucky integer return `-1`.

<details>
<summary>Examples</summary>

Example 1:

```
Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
```

Example 2:

```
Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.
```

Example 3:

```
Input: arr = [2,2,2,3,3]
Output: -1
Explanation: There are no lucky numbers in the array.
```

Example 4:

```
Input: arr = [5]
Output: -1
```

Example 5:

```
Input: arr = [7,7,7,7,7,7,7]
Output: 7
```
</details>

<details>
<summary>Constraints</summary>

- `1 <= arr.length <= 500`
- `1 <= arr[i] <= 500`
</details>

## My Solution

This solution creates a Map of the integer values in `arr` along with their count. It then iterates over the Map, comparing keys and values for equality. An initial `result` of `-1` is then replaced if a lucky integer is found, and any larger lucky integer will in turn replace a smaller one. This takes $O(n)$ time.

```javascript
const findLucky = (arr) => {
    const integers = new Map();
    let result = -1;

    arr.forEach(i => {
        if (!integers.has(i)) {
            integers.set(i, 1);
        } else {
            integers.set(i, 1 + integers.get(i));
        }
    });

    for ([key, value] of integers) {
        if (key === value && key > result) {
            result = key;
        }
    }

    return result;
};
```
