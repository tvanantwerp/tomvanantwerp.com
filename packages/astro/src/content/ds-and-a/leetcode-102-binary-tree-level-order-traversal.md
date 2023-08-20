---
title: LeetCode 102. Binary Tree Level Order Traversal
description: Given the root of a binary tree, return the level order traversal of its nodes' values.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/binary-tree-level-order-traversal/)

Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

<details>
<summary>Examples</summary>

Example 1:

```
  3
 / \
9   20
   / \
  15  17

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

Example 2:

```
Input: root = [1]
Output: [[1]]
```

Example 3:

```
Input: root = []
Output: []
```

</details>

<details>
<summary>Constraints</summary>

</details>

## My Solution

This solution is fairly straightforward with a queue. We need a variable to store the child nodes that we haven't yet traversed on a given level, and we can initialize it with the root node. As long as the queue has values in it, we've still got nodes to process—so we'll go over it with a while loop. Each iteration of the while loop drains the queue of nodes in the current level, and refills it with nodes on the next level.

```typescript
// Define our TreeNode class, provided from leetcode
class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

function levelOrder(root: TreeNode | null): number[][] {
	// No root node? Return empty string.
	if (!root) return [];

	const output = [];
	// We'll use an array to queue up nodes we haven't checked.
	const queue = [root];

	// For any given iteration of the while loop, our queue will
	// contain all of the nodes on that level.
	while (queue.length) {
		// This variable will hold the values at this level.
		const levelOutput = [];
		// We save the current queue length, because we'll need
		// it in the for loop; but the queue itself will
		// be modified throughout, and its length would change.
		const levelLength = queue.length;
		for (let i = 0; i < levelLength; i++) {
			// Grab the first item in our queue. Push it's value to
			// the levelOutput variable, then add its child nodes
			// to the queue if they exist.
			const node = queue.shift();
			levelOutput.push(node.val);
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
		// Add this level's values into our output array.
		output.push(levelOutput);
	}

	return output;
}
```

If you want to get fancy, you can get the same results with a few array methods. This shouldn't be quite as time efficient, since it loops over everything in the queue twice during the while loop versus once in the previous solution. But I do so enjoy using array methods!

```typescript
function levelOrder(root: TreeNode | null): number[][] {
	if (!root) return [];
	const output = [];
	let queue = [root];
	while (queue.length) {
		output.push(queue.map(node => node.val));
		queue = queue.flatMap(node => {
			return [node.left, node.right].filter(n => n !== null);
		});
	}
	return output;
}
```
