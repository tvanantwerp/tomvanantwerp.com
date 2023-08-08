---
title: LeetCode 1143. Longest Common Subsequence
description: Given two strings, return the length of their longest common subsequence.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/longest-common-subsequence/)

Given two strings `text1` and `text2`, return _the length of their longest **common subsequence**_. If there is no common subsequence, return 0.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

A **common subsequence** of two strings is a subsequence that is common to both strings.

<details>
<summary>Examples</summary>

Example 1:

```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

Example 2:

```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

Example 3:

```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

</details>

<details>
<summary>Constraints</summary>

- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters.
</details>

## My Solution

### Bottom-Up Dynamic Programming

We can break the problem down into subproblems with dynamic programming. For any pair of characters in `text1` or `text2`, if they match, then we know we can add `1` to the longest common subsequence we've found so far.

But how should we keep track of the longest subsequence we've seen? We can create a 2D array to make a table of values. One "column" for every letter in `text1`, and one "row" for each letter of `text2`. We'll add one extra row and column upfront too, just to have an initial `0` to compare against in the subproblems. Example, where `text1 = 'coder'` and `text2 = 'ace'`:

```
    c o d e r
  0 0 0 0 0 0
a 0 0 0 0 0 0
c 0 1 1 1 1 1
e 0 1 1 1 2 2
```

For each letter in "coder", we see if "a" matches. It never does, so that whole row is `0`. But when we go to "c", now we have `1` match! The letter "c" doesn't match anything else in "coder" besides the first letter, so that `1` just carries over to each position afterward. Finally, we check for "e". We continue carrying over our previous value of `1` until we hit another match, and increment to `2`.

In array form, the above table would look like:

```javascript
const dp = [
	[0, 0, 0, 0],
	[0, 0, 1, 1],
	[0, 0, 1, 1],
	[0, 0, 1, 1],
	[0, 0, 1, 2],
	[0, 0, 1, 2],
];
```

We know that the very last value of this array, `dp[text.length][text2.length]` will be the length of the longest common subsequence.

```typescript
function longestCommonSubsequence(text1: string, text2: string): number {
	// First we initialize an array to store our table of values.
	// Since we're using dynamic programming, we'll call it dp.
	// It had an outer array of the length of text1 + 1, and each
	// value of that array is another array of length equal to
	// the length of text2 + 1. We intitialize with all zeroes.
	const dp: number[][] = Array.from({ length: text1.length + 1 }, () =>
		Array.from({ length: text2.length + 1 }, () => 0),
	);

	for (let i = 1; i <= text1.length; i++) {
		for (let j = 1; j <= text2.length; j++) {
			// Check if the characters at the i - 1 and j - 1
			// indices of text1 and text2 respectively are the same.
			if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
				// If the characters match, set dp[i][j] to 1 plus
				// whatever was stored in dp for the previous indices.
				dp[i][j] = 1 + dp[i - 1][j - 1];
			} else {
				// Otherwise, just set it to the maximum of the previous
				// j - 1 value of i, or j value of i - 1.
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}

	// The final values in dp should have the correct length of
	// the longest common subsequence.
	return dp[text1.length][text2.length];
}
```
