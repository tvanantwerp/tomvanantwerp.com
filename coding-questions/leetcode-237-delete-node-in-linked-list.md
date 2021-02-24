---
title: 237. Delete Node in a Linked List
description: Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, instead you will be given access to the node to be deleted directly.
tags:
  - Coding Questions
layout: layouts/coding-questions.liquid
---

## The Problem

[Link to original problem on Leetcode](https://leetcode.com/problems/delete-node-in-a-linked-list/)

Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, instead you will be given access to the node to be deleted directly.

It is guaranteed that the node to be deleted is not a tail node in the list.

Example 1:
```
Input: head = [4,5,1,9], n = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
```

Example 2:
```
Input: head = [4,5,1,9], n = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.

Constraints:
  -  The number of the nodes in the given list is in the range `[2, 1000]`.
  -  `-1000 <= Node.val <= 1000`
  -  The value of each node in the list is unique.
  -  The node given to be deleted exists in the list, and cannot be the tail value.

```

## My solution

Since I don't know the preceding node, I can't just change that node's `this.val` to the current node's `this.next`. So instead, I'll just this node to equal the next node.

This works with the given constraints, such as the knowledge that we're never asked to delete the tail node.

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
const deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
```

## Best solution

Pretty much every other JavaScript solution looked like mine. One clever one, though, used JavaScript's `Object.assign()` to make it a one-liner. Runtime and memory came out identically to my original submission.

```javascript
var deleteNode = function(node) {
    Object.assign(node, node.next);
};
```