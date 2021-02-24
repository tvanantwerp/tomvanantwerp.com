---
title: 104. Maximum Depth of Binary Tree
description: Given a binary tree, find its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
tags:
  - Coding Questions
layout: layouts/coding-questions.liquid
---

## The Problem

[Link to original problem on Leetcode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree `[3,9,20,null,null,15,7]`,
```
    3
   / \
  9  20
    /  \
   15   7
```
return its depth = 3.

## My Solution

This solution uses recursion. It beat 91.16% of submissions in runtime and 82.15% in memory usage.

```javascript
const maxDepth = (root) => {
    // Terminate immediately if there is no node provided
    // This is handy when called on a non-existant child.
    if (!root) {
        return 0;
    }

    // Recursively call this function on the children of the node.
    // Add a 1, because if this is a leaf, you'd get Math.max(0, 0).
    // The 1 represents this level, which will serve as the starting
    // point to count each level back to the root.
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

## Best Solution

Solutions page locked, but here is another JS answer that is roughly equivalent to mine. Could be a one-liner, but I find it easier to read as three.

```javascript
const maxDepth = (root) => !root
  ? 0
  : 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
```

Another solution that uses iteration instead of recursion:

```javascript
const maxDepth = (root) => {
    if (!root) return 0;
    // Initialize a queue with the root node.
    const queue = [root];
    // Initialize the tree's depth at 0.
    let depth = 0;

    while (queue.length !== 0) {
        const len = queue.length;

        // Iterates over each item in the queue, adding all child nodes
        // to the queue. So in the original example, the queue starts at
        // [3] and becomes [9, 20]. Then the depth is iterated by 1.
        // Next would be [9, 20] to [15, 7].
        // Loop ended when there's nothing left to add to the queue.
        for (let i = 0; i < len; i++) {
            let item = queue.shift()
            if (item.left) queue.push(item.left);
            if (item.right) queue.push(item.right);
        }
        depth++;
    }

    // Return the deepest level you could hit.
    return depth;
};
```