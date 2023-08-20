---
title: LeetCode 143. Reorder List
description: 'You are given the head of a singly linked-list 1 to N. Reorder the list to be on the following form: 1 → N → 2 → N-1 → 3 → N-2 → …'
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

To solve this problem, we need to do three things:

1. Divide the list into halves
2. Reverse the second half
3. Recombine the two halves in an alternative sequence

There's a pretty easy way to solve step one. We use two pointers and initialize both to point at the head. Then we increment through the list—but while one pointer moves through one node at a time (`slow`), the other moves two nodes at a time (`fast`). This means, when there's nowhere left for the `fast` pointer to go (either it is `null`, or its `next` value is `null`), the `slow` pointer will be at one of two positions: the precise midpoint (if the list has an odd number of nodes), or the node just before the midpoint (if the list has an even number of nodes).

Next, we'll [reverse the second half of the list](/coding-questions/leetcode-206-reverse-linked-list/). We'll create a `previous` pointer initialized to `null` (because we haven't had a previous node yet!) and a `current` pointer initialized to `slow.next`, which is the beginning of the second half of the original list.[^1] Then, for as long as `current` is not `null`, we'll shift things around. We create a scoped `next` node equal to `current.next`. We'll need that pointer at the end of this loop to initialize the next loop. Then we change `current`'s `next` to point to the `previous` node. (In the first iteration, `null`, marking the end of the new reversed list.) Then `current` becomes our `previous` for the next iteration, and the new `current` will be what was our `next`. By the end of our loop, we've got a list starting at `previous` that's sorted backwards from when we started at `slow.next`.

Merging our two lists is similar to reversing one. We initialize 2 head nodes, `head1 = head` and `head2 = previous`. Then, while we've got a `head2`, we'll temporarily store a `next` pointer for `head1.next`. We then change `head1.next` to point at `head2` instead. And to set us up for the next loop, `head1` will now point at `head2` and `head2` will point at `next`. By the end of this loop, we'll have a list that's been merged in the alternating order we want.

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
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
		// Just in case the list is circular, we check
		// if slow and fast are pointing at the same node.
		// In a circular list, fast will eventually come back
		// around and catch up to slow.
		if (slow === fast) throw new Error('List is circular');
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
	// the first half of the list is properly terminated.
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

[^1]: We skip ahead one to `slow.next` in case we're in a list with an even number of nodes. This doesn't affect the answer if the list had an odd node count. Consider these simple examples: `[1, 2, 3] => [1, 3, 2]` and `[1, 2, 3, 4] => [1, 4, 2, 3]`. It's essential in the second sort that `3` be the start of the second half of the list, not `2`—but in the case of `[1, 2, 3]`, we could pivot on either `2` or `3` and get the same result.
