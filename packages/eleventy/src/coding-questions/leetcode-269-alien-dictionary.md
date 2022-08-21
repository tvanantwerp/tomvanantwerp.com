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
- There may be multiple valid order of letters, returning any one of them is fine.
</details>

## My Solution

To solve this problem, we'll use a topological sort.[^1] A [topological sort](https://en.wikipedia.org/wiki/Topological_sorting) is when we take a directed acyclic graph[^2] and we list out nodes in a valid traversal order.

As stated in the problem conditions:

> There may be multiple valid order of letters, returning any one of them is fine.

This is a clue to us that topological sort is the appropriate approach. Depending on whether we use breadth first or depth first search, and on the initial ordering of inputs, we might get slightly different results—but as long as it is still a _valid_ way to traverse the graph we've got, it won't matter.

### Breadth First Search

First, a breadth first search approach. With BFS, we'll initialize an adjacency list (i.e., a map of characters and the other characters that could come after them) and a count of indegrees. The indegrees of a node are the number of incoming directed edges. So a character that is potentially the first character in our sorted order should have 0 indegrees. If we detect any invalid sorting in the input at this stage, we return early with an empty string.

We initialize a queue with all letters that have 0 indegrees. As we go through our queue, we remove each letter, add it to a result variable, and then decrement the indegrees of its neighboring characters. When a character's indegrees becomes 0, it's now a candidate for being the next in order, and gets added to the queue.

Finally, if our result includes each letter we know about from `words`, then our result is valid and we return it.

```typescript
function alienDictionary(words: string[]) {
	const adjacencyList = new Map<string, Set<string>>();
	// I know there are 26 possible letters, so go ahead
	// and create 26 spaces in the indegrees array and
	// initialize them all with 0.
	const indegrees = Array(26).fill(0);

	// Initialize our adjacency list with empty sets
	// for each letter we know about.
	words.forEach(word => {
		word.split('').forEach(char => {
			if (!adjacencyList.get(char)) {
				adjacencyList.set(char, new Set());
			}
		});
	});

	// Fill out our adjacency list and indegrees array
	// by iterating through pairs of words in the array.
	for (let i = 0; i < words.length - 1; i++) {
		// First, set variables for the first and second
		// word in the array the we'll compare.
		const word1 = words[i],
			word2 = words[i + 1];
		// We set a variable length to the length of the
		// shorted of the two words, because we can't
		// compare the nth + 1 letter of the second word
		// to the nth + 1 letter of the first if the first
		// is only n characters long.
		const length = Math.min(word1.length, word2.length);

		// If our first word is longer than the second,
		// and their characters match for the shared
		// length, then we've got an invalid input.
		// Return early with an empty string.
		if (
			word1.length > word2.length &&
			word1.slice(0, length) === word2.slice(0, length)
		) {
			return '';
		}

		// Compare letters over the shared length of the two
		// words we're comparing.
		for (let j = 0; j < length; j++) {
			// If the letters are different, we will check if
			// the adjacency list already knows that the first
			// letter leads to the second. If not, we add it
			// and increase that second letter's indegrees.
			if (word1[j] !== word2[j]) {
				if (!adjacencyList.get(word1[j]).has(word2[j])) {
					adjacencyList.get(word1[j]).add(word2[j]);
					indegrees[indegreesPos(word2[j])] += 1;
					// Now we break out of the loop, or we risk
					// adding incorrect information to our data.
					break;
				}
			}
		}
	}

	// Initialize a result and a queue
	let result = '';
	const queue = [];

	// Add to the queue any character in the adjacency
	// list which has indegrees of zero, which is to
	// say, any letter which doesn't have another letter
	// pointing to it.
	for (const [char] of adjacencyList) {
		if (indegrees[indegreesPos(char)] === 0) {
			queue.push(char);
		}
	}

	// We now go through the queue...
	while (queue.length) {
		// Grab the first character from the front of the
		// queue and add it to the result.
		const char = queue.shift();
		result += char;

		// Iterate through the character's neighbors
		for (const neighbor of adjacencyList.get(char)) {
			// Since we've traversed this character, we
			// decrement the inedegrees of its neighbors.
			indegrees[indegreesPos(neighbor)] -= 1;
			// If the neighbor now has indegrees of 0, it
			// becomes a candidate for being the next
			// character and gets added to the queue.
			if (indegrees[indegreesPos(neighbor)] === 0) {
				queue.push(neighbor);
			}
		}
	}

	// Finally, if our result is the same length as the
	// adjacency list (i.e., we ordered all of the
	// characters), then we return it. Otherwise, this
	// traversal couldn't be done and we return an
	// empty string.
	return result.length === adjacencyList.size ? result : '';
}

// This is a helper function for accessing the correct
// index in our indegrees array.
function indegreesPos(char: string) {
	return char.charCodeAt(0) - 'a'.charCodeAt(0);
}
```

### Depth First Search

Our depth first search starts similarly to BFS with the creation of an adjacency list. However, instead of listing what characters come after a given character, we flip things around and list characters that could come before it. We do this because, otherwise, our result would be backwards! If we used DFS from start to finish, then our recursive function would first realize we hit an ending point _at the end_ of the chain of letters. As the results bubbled back to the start, we'd receive values in order from last to first.

So instead, we do our DFS from end to beginning! We could've also just kept the adjacency list the same as in BFS and reversed the order at the end of the function, but it's good to see it done a different way.

```typescript
function alienDictionary(words: string[]) {
	const adjacencyList = new Map<string, Set<string>>();
	// Initialize our adjacency list with empty sets
	// for each letter we know about.
	words.forEach(word => {
		word.split('').forEach(char => {
			if (!adjacencyList.get(char)) {
				adjacencyList.set(char, new Set());
			}
		});
	});

	// Fill out our adjacency list by iterating through pairs of
	// words in the array.
	for (let i = 0; i < words.length - 1; i++) {
		// First, set variables for the first and second
		// word in the array the we'll compare.
		const word1 = words[i],
			word2 = words[i + 1];
		// We set a variable length to the length of the
		// shorted of the two words, because we can't
		// compare the nth + 1 letter of the second word
		// to the nth + 1 letter of the first if the first
		// is only n characters long.
		const length = Math.min(word1.length, word2.length);

		// If our first word is longer than the second,
		// and their characters match for the shared
		// length, then we've got an invalid input.
		// Return early with an empty string.
		if (
			word1.length > word2.length &&
			word1.slice(0, length) === word2.slice(0, length)
		) {
			return '';
		}

		// Compare letters over the shared length of the two
		// words we're comparing.
		for (let j = 0; j < length; j++) {
			// If the letters are different, we will check if
			// the adjacency list already knows that the second
			// letter has the first as a precedent. If not, we
			// add the first letter to the lists of letters
			// leading into the second.
			if (word1[j] !== word2[j]) {
				if (!adjacencyList.get(word2[j]).has(word1[j])) {
					adjacencyList.get(word2[j]).add(word1[j]);
					// Now we break out of the loop, or we risk
					// adding incorrect information to our data.
					break;
				}
			}
		}
	}

	// Our depth first search function will need a way to know
	// which characters have been visited or not, and a place
	// to add to the result.
	const visited = new Map<string, boolean>();
	let result = '';

	// This DFS function will recursively work its way up through
	// the potential parent characters of any character. If a
	// character has been visited, the function returns its value
	// from visited. If that value is true, it means we saw that
	// character already in this particular DFS stack, indicating
	// a loop and, by extension, invalid inputs. It won't matter
	// if the function returns false—this just means that the
	// character has been seen in a previous traversal, and that
	// we've satisfied our base case for this traversal.
	function dfs(char: string) {
		// If we've seen the character, but not on this traversal,
		// that's OK. Return false.
		if (visited.has(char)) return visited.get(char);

		// Set the current character as visited during this
		// traversal, then recursively call dfs on all of its
		// preceding characters.
		visited.set(char, true);
		for (const precedent of adjacencyList.get(char)) {
			if (dfs(precedent)) return true;
		}
		// Once the dfs is done, set the character back to not
		// visited for future traversals.
		visited.set(char, false);
		// Finally, we can add the character to the result.
		result += char;
	}

	// Call dfs on every character in the adjacency list. If
	// dfs returns true at any point, then words is invalid and
	// we must return an empty string.
	for (const [char] of adjacencyList) {
		if (dfs(char)) return '';
	}

	// If we have a valid result (it includes all characters
	// from words), then we return it; otherwise, return an
	// empty string.
	return result.length === adjacencyList.size ? result : '';
}
```

[^1]: See [course schedule](/coding-questions/leetcode-207-course-schedule) for another example of topological sort.
[^2]: A directed acyclic graph has two properties: edges between nodes have a direction, and there is no cycle in the graph allowing you to revisit previously traversed nodes. In this example, consider the regular English alphabet where letters equal nodes. You can go from A to B, B to C, etc. The connections between letters have a _direction_. But also, you _cannot_ go from A to B and back to A. That would by a cycle, which is not allowed in acyclic graphs.