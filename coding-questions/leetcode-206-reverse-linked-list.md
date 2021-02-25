---
title: 206. Reverse Linked List
description: Reverse a singly linked list.
tags:
  - Coding Questions
layout: layouts/writing.liquid
---

## The Problem

[Link to original problem on Leetcode](https://leetcode.com/problems/reverse-linked-list/)

Reverse a singly linked list.

Example:
```
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```

Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?

## My Solution

Here are my attempts to reverse the list both iteratively and recursively.

### Iterative Version

Here I create variables to store the list I'm iterating through, and the new one I'm building up. I go through the original list with a while loop, setting the `reversedList` to equal a new node with the `currentNode`'s value as its own and the previous value of `reversedList` as the next node. Then the `currentNode` is set to it's next value. The loop terminates when the next node of `currentList` is `null`.

Got a 98.12% on speed (68ms), but only 38.39% (38.7mb) on memory.

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
    let currentNode = head;
    let reversedList = null;

    while (currentNode) {
        reversedList = new ListNode(currentNode.val, reversedList);
        currentNode = currentNode.next;
    }

    return reversedList;
};
```

### Recursive Version

If `head` is `null`, then return the value of `reversed` immediately. Otherwise, return the function with `head`'s next node as the new `head` and a new `ListNode` for `reversed` with `head`'s value as the value and the previous value of `reversed` as the next node.

Got a 86.52% on speed (76ms), but only 5% (39.5mb) on memory.

```javascript
const reverseList = function(head, reversed = null) {
    if (!head) return reversed;
    return reverseList(head.next, new ListNode(head.val, reversed));
};
```

## Best Solution

I need to review more of these solutions. Rather than create new ListNodes, they tend to just store one value or another in a temporary variable and then mutate the originals to flip things around.

Example:
```javascript
var reverseList = function(head, prev=null) {
    if(!head) return prev;
    let temp = head.next;
    head.next = prev;
    return reverseList(temp, head);
};

var reverseList = function(head) {
    let node = head, reversed = null;
    while(node){
        let temp = node;
        node=node.next;
        temp.next = reversed;
        reversed = temp;
    }
    return reversed;
};
```