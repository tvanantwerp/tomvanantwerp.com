---
title: LeetCode 143. Reorder List
description: You are given the head of a singly linked-list 1 to N. Reorder the list to be on the following form: 1 → N → 2 → N-1 → 3 → N-2 → …
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/reorder-list/description/)

You are given the head of a singly linked-list. The list can be represented as:

```
L0 → L1 → … → Ln - 1 → Ln
```

Reorder the list to be on the following form:

```
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

<details>
<summary>Examples</summary>

Example 1:

```
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

Example 2:

```
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

</details>

<details>
<summary>Constraints</summary>

- The number of nodes in the list is in the range <code>[1, 5 * 10<sup>4</sup>]</code>.
- `1 <= Node.val <= 1000``
</details>

## My Solution

```typescript
// This ListNode is provided by LeetCode.
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

// This is my solution.
function reorderList(head: ListNode | null): void {
	if (head === null || head.next === null) return;

	// This section finds the middle of the list.
	// We use two pointer and advance through the list,
	// one pointer moving one node at a time and the
	// other going two at a time. When the fast pointer
	// reaches the end, we know the slow pointer must
	// be in the middle.
	let slow = head,
		fast = head;
	while (fast.next && fast.next.next) {
		slow = slow.next;
		fast = fast.next.next;
	}

	// Next we reverse the second half of the list.
	// We know where to start thanks to the slow pointer
	// from the previous section, which is currently in
	// the middle of the list. We initialize a current
	// pointer to that mid-point, and a previous pointer
	// to null.
	let previous: ListNode | null = null,
		current = slow.next;
	while (current) {
		// We're modifying the list in place, so we need to
		// keep track of the next node before we change the
		// current node's next pointer. So we initialize a
		// next pointer to the current node's next.
		const next = current.next;
		// Now we can change the current node's next pointer
		// to point to the previous node. This swaps their order.
		current.next = previous;
		// The subsequent iteration's previous should be the
		// current node.
		previous = current;
		// Finally, the current node is set to be the next
		// node in the originally ordered list so that we
		// can continue processing.
		current = next;
	}
	// We need to set the slow pointer's next to null so that
	// the list is properly terminated. Otherwise we get a
	// circular list.
	slow.next = null;

	// Finally we merge the two lists.
	let head1 = head,
		head2 = previous;
	while (head2) {
		// Again, since we're changing the list in place, we
		// need a way to keep track of the next node before
		// we change the current node's next pointer. So we
		// initialize a `next` pointer to the first list's
		// next node.
		const next = head1.next;
		// Then, we set the next of the head to instead be
		// the head of the second list.
		head1.next = head2;
		// Finally, to advance for the next iteration, we set
		// the head of the first list to be the head of the
		// second list, and the head of the second list to be
		// the previously overwritten next pointer.
		head1 = head2;
		head2 = next;
	}
}
```
