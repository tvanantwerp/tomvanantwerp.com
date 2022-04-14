---
title: 91. Decode Ways
description: Given a string containing only digits, return the number of ways to decode it to letters of the alphabet where 1 = A, 2 = B, etc.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/decode-ways/)

A message containing letters from `A-Z` can be **encoded** into numbers using the following mapping:

```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

To **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, `"11106"` can be mapped into:

- `"AAJF"` with the grouping (`1 1 10 6)`
- `"KJF"` with the grouping `(11 10 6)`

Note that the grouping `(1 11 06)` is invalid because `"06"` cannot be mapped into `'F'` since `"6"` is different from `"06"`.

Given a string `s` containing only digits, return _the **number** of ways to **decode** it_.

The test cases are generated so that the answer fits in a **32-bit** integer.

<details>
<summary>Examples</summary>

Example 1:

```
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
```

Example 2:

```
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

Example 3:

```
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
```
</details>

<details>
<summary>Constraints</summary>


- `1 <= s.length <= 100`
- `s` contains only digits and may contain leading zero(s).
</details>

## My Solution

This is a dynamic programming problem. It needs to be solved by breaking the problem down into sub-problems. We can do it either recursively or iteratively.

### Recursion with Memoization

To solve this recursively, we will call the function again and again with smaller sub-sections of the original string until we trigger a base case. Here, we'll assume that an empty string means we've found a correct decoding and to return `1`. If at any point the string starts with `"0"`, we know it can't be properly mapped and return `0`. These smaller sub-strings will be memoized in out `memo` variable, so that we don't waste resources recomputing things we've seen before.

```typescript
// We modify the function to accept a Map named memo. We'll
// use this to cache previously seen strings that we've
// decoded. It's initialized to an empty Map.
function numDecodings(s: string, memo: Map<string, number> = new Map()): number {
	// Base case: if the string is empty, we've found 1 way.
	if (s === '') return 1;
	// If the string has a leading zero, it cannot have any
	// successful mapping, so return 0.
	if (s.slice(0, 1) === '0') return 0;

	// Don't recompute if we've seen this string before. Just
	// return what's in our map.
	if (memo.has(s)) return memo.get(s);

	// We'll initialize variables to analyze the pieces of the
	// string that would be either a single digit to letter
	// decoding, or a two digit number to letter decoding.
	let singleDigit = 0, doubleDigit = 0;

	// For single digit decodings, we need to know that the number
	// is between 1 and 9 inclusive. If so, we recursively call
	// the function on the rest of the string after this single
	// digit. If there was only one letter in the string left,
	// we'd be calling with an empty string and get our base case
	// returned.
	if (1 <= +s.slice(0, 1) && 9 >= +s.slice(0, 1)) {
		singleDigit = numDecodings(s.slice(1), memo);
	}

	// For double digit decodings, our two letters of the string
	// must parse as an int between 10 and 26 inclusive. If it
	// does, we call the function again with the rest of
	// the string after those two letters.
	if (10 <= +s.slice(0, 2) && 26 >= +s.slice(0, 2)) {
		doubleDigit = numDecodings(s.slice(2), memo);
	}

	// To prevent needless recalculation of repeating sequences in
	// the string, save the evaluations to our Map.
	memo.set(s, singleDigit + doubleDigit);

	// Finally, return the memoized value of the string.
	return memo.get(s);
};
```

### Solving Iteratively with Dynamic Programming

The iterative solution is, in my opinion, easier to understand. We create an array `dp` to hold a running count of valid decodings. We will iterate through the string `s`, examining the integer values of the previous character and the pair of previous two characters. (We initialized `dp[0]` and `dp[1]` to make sure we don't go out of range when we do this.)

If the currently examined sub-string matches the conditions for either the single- or double-digit decoding, we add to `dp[i]` the previous value of `dp` for either single- or double-digits. So if we're looking at single-digits, and `+s.slice(i - 1, i)` meets the criteria, then `dp[i]` will have the value of `dp[i - 1]` added to it. It's important that we're adding to an existing value, not setting it equal to the value, because we're going to be modifying any given `dp[i]` multiple times as we check for both valid single- and double-digit decodings.

As we go through the string, values of `dp[i]` ought to increase as `i` increased and we find ever more valid decodings. Finally, `dp[s.length]` will have the total number of valid decodings for the string `s`.

```typescript
function numDecodings(s: string): number {
	if (s === '') return 0;

	// Initialize dp as an array with length equal to 1 plus the
	// length of the string, all values set to zero.
	const dp: number[] = Array.from({length: s.length + 1}, () => 0);

	// We initialize our dp cache's first two values. dp[0] is 1,
	// and this is what we'll add to dp[2] if our first double-
	// digit check is valid. dp[1] is either 0 or 1, depending on
	// the first character of s. Since leading zeroes aren't
	// valid, then we only initialize dp[1] = 1 if there is no
	// leading zero. This is the value that will be added to dp[2]
	// if the first single-digit decoding validates.
	dp[0] = 1;
	if (s.charAt(0) !== '0') dp[1] = 1;

	for (let i = 2; i <= s.length; i++) {
		// For deciding dp[i], we look back at the previous 1 and 2
		// characters of s to see if they are valid encodings for
		// a letter.
		const singleDigit = +s.slice(i - 1, i);
		const doubleDigit = +s.slice(i - 2, i);

		// If the single-digit encoding is valid, dp[i] should have
		// the value of dp[i - 1] added to it.
		if (1 <= singleDigit && 9 >= singleDigit) {
			dp[i] += dp[i - 1];
		}

		// Now we also add dp[i - 2] to dp[i] if the double-digit
		// encoding is valid.
		if (10 <= doubleDigit && 26 >= doubleDigit) {
			dp[i] += dp[i - 2];
		}
	}

	// Finally, the last value of dp has the total number of valid
	// encodings.
	return dp[s.length];
};
```