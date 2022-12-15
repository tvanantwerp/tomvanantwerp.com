---
title: LeetCode 141. Linked List Cycle
description: Given the head of a linked list, determine if the linked list has a cycle in it.
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/linked-list-cycle/)

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. Note that `pos` is not passed as a parameter.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

<details>
<summary>Examples</summary>

Example 1:

```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

Example 2:

```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

Example 3:

```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

</details>

<details>
<summary>Constraints</summary>

- The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>].</code>
- <code>-10<sup>5</sup> <= Node.val <= 10<sup>5</sup></code>
- `pos` is `-1` or **a valid index** in the linked-list.

</details>

## My Solution

To find a cycle in the linked list, we can use the [tortoise and hare approach](https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_tortoise_and_hare). We instantiate two pointer, `fast` and `slow`. The `slow` pointer moves from node to node one at a time, and the `fast` pointer skips over a node to move through two at a time. If a cycle exists in the list, the `fast` pointer will move around the cycle and eventually equal the `slow` pointer. However, if `fast` reaches the end of the list and has no further nodes to move to, then there is no cycle.

```typescript
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

function hasCycle(head: ListNode | null): boolean {
	if (!head) return false;
	let slow = head,
		fast = head;
	while (fast) {
		if (!fast.next) {
			return false;
		} else {
			slow = slow.next;
			fast = fast.next.next;
		}
		if (slow === fast) return true;
	}
	return false;
}
```
