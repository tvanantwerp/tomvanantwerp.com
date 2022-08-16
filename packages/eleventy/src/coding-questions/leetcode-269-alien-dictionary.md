---
title: 269. Alien Dictionary
description: You are given a list of words from an alien language's dictionary, and you must return a string of unique letters in the alien language sorted lexicographically.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/alien-dictionary/)

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are **sorted lexicographically** by the rules of this new language.

Return _a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If there is no solution, return `""`. If there are multiple solutions, return **any of them**_.

A string `s` is **lexicographically smaller** than a string `t` if at the first letter where they differ, the letter in `s` comes before the letter in `t` in the alien language. If the first `min(s.length, t.length)` letters are the same, then `s` is smaller if and only if `s.length < t.length`.

<details>
<summary>Examples</summary>

Example 1:

```
Input: words = ["wrt", "wrf", "er", "ett", "rftt"]
Output: "wertf"
```

Example 2:

```
Input: ["z", "x"]
Output: "zx"
```

Example 3:

```
Input: ["z", "x", "z"]
Output: ""
Explanation: The order is invalid, so return "".
```
</details>

<details>
<summary>Constraints</summary>

- You may assume all letters are in lowercase.
- You may assume that if `a` is a prefix of `b`, then `a` must appear before `b` in the given dictionary.
- If the order is invalid, return an empty string.
- There may be multiple valid order of letters, return any one of them is fine.
</details>

## My Solution


