---
title: LeetCode 139. Word Break
description: Given a string and a dictionary of strings, return true if the string can be segmented into a space-separated sequence of one or more dictionary words.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/word-break/)

Given a string `s` and a dictionary of strings `wordDict`, return `true` if s can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.

<details>
<summary>Examples</summary>

Example 1:

```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

Example 2:

```
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

Example 3:

```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```
</details>

<details>
<summary>Constraints</summary>

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of only lowercase English letters.
- All the strings of `wordDict` are **unique**.
</details>

## My Solution

### Dynamic Programming

We can use dynamic programming and break this problem into sub=problems. Consider when we start: the beginning of the string `s` is easy to confidently check words against, because nothing comes before it that might not be in the word dictionary. We'd like that same confidence when we're checking the rest of the string, and we can have it!

We'll create an array of `s.length + 1`, and set all values to `false` except for the `0`th value—that one will be true. Each of these values represents a position in the string, and whether or not we've seen a path to reach it with words from `wordDict`. The first value is `true`, because of course we have a path to the beginning of the string!. As we check through slices of the string, whenever we find a slice that matches a word in our dictionary, we can set the corresponding array index for the end of that slice to `true` also. This will tell us going forward that we can safely start to check new values from that position.

So each time we check a new word against a slice later in the string, we can see that _both_ the slice matches a dictionary word _and_ some combination of prior words in the string will let us actually reach that word.

```typescript
function wordBreak(s: string, wordDict: string[]): boolean {
	if (wordDict.length === 0) return false;

	// Initialize an array of s.length + 1 with all false
	// values, except for the very first one.
	const dp = Array.from(
		{ length: s.length + 1} ,
		(v, i) => i === 0 ? true : false
	);
	// To improve performance, we'll find the longest word
	// in the dictionary and store its length. We'll use it
	// to limit how many characters in a slice we use.
	const longestWordLength = wordDict.reduce(
		(acc, curr) => curr.length > acc ? curr.length : acc,
		0
	);
	// Our constraints promise no duplicate words,
	// but just in case...
	const words = new Set(wordDict);

	// Our first loop will track the end of our slice.
	// Remember, the end of a slice is *not* part of
	// the string returned by slice.
	for (let end = 1; end <= s.length; end++) {
		// The second loop picks a starting index just before
		// our slice's endpoint, and will decrement back as
		// far as 0 or the length of the longest word from
		// the end of the slice.
		for (
			let start = end - 1;
			start >= Math.max(0, end - longestWordLength);
			start--
		) {
			// We check if a slice of s with our current start and end
			// matches any dictionary word, and if we've previously
			// established that we can safely reach this start point
			// with some other combination of dictionary words.
			if (dp[start] && words.has(s.slice(start, end))) {
				// If yes to both, we can now mark this end point as
				// a safe starting point.
				dp[end] = true;
				break;
			}
		}
	}

	// The final value of our array of safe points will be true
	// if the s can be built from words in wordDict, and false
	// if we couldn't find a way to do it.
	return dp[s.length];
};
```