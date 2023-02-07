---
title: 21. Merge Two Sorted Lists
description: You are given the heads of two sorted linked lists. Merge the two lists in a one sorted list.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/merge-two-sorted-lists/)

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

Example 2:

```
Input: list1 = [], list2 = []
Output: []
```

Example 3:

```
Input: list1 = [], list2 = [0]
Output: [0]
```
</details>

<details>
<summary>Constraints</summary>

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in **non-decreasing** order.
</details>

## My Solution

### The Cheating Solution

This is a problem about linked lists, so you should solve it in a way that shows you understand linked lists. For the first example, let's throw that sensible approach out of the window. Instead of merging the lists by comparing values and putting together a new list, we'll instead turn the lists into arrays, merge those, then convert the arrays back into linked lists.

This is perfectly functional, but it probably won't go over well in interviews.

```typescript
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val);
		this.next = (next===undefined ? null : next);
	}
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
	// First, check if either list is null.
	// If so, return the other list or null if both
	// lists are null.
	if (!list1 || !list2) return list1 || list2;

	// We create a new array by spreading the results of a new
	// function that converts ours list nodes into an array of
	// numbers. Then, we sort that array. Make sure to use that
	// comparison function, because default sort is alphabetical
	// and will give errors with negative numbers! Finally,
	// the array is stitched back together into a new list.
	return arrayToList(
		[
			...listToArray(list1),
			...listToArray(list2)
		].sort((a, b) => a - b)
	);
};

function listToArray(list: ListNode) {
	// Recursively traverse the list. Return values in an array.
	return list.next ? [list.val, ...listToArray(list.next)] : [list.val];
}

function arrayToList(values: number[]) {
	// Create a new ListNode from the last value of the array.
	let list = new ListNode(values.at(-1), null);

	// Loop backward through the array, starting at the
	// second-to-last value. Change the list head to equal
	// a new ListNode with the current value and it's previously
	// assigned head as the next node.
	for (let i = values.length - 2; i >= 0; i--) {
		list = new ListNode(values[i], list);
	}
	return list;
}
```

### Linked List Iterative Solution

Ok, let's do this the proper way. This problem can be solved recursively or iteratively. I'm going to use the iterative solution, because there's a risk that with sufficiently long lists, you could exceed the maximum recursion depth. This solution is $O(m + n)$ time complexity.

```typescript
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val);
		this.next = (next===undefined ? null : next);
	}
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
	// First, check if either list is null.
	// If so, return the other list or null if both
	// lists are null.
	if (!list1 || !list2) return list1 || list2;

	// Create a variable to store the head of our result
	let result: ListNode | null = null;

	// Initialize our result variable to equal the head of
	// whichever of list1 or list2 has the smallest value.
	if (list1.val < list2.val) {
		result = list1;
		list1 = list1.next
	} else {
		result = list2;
		list2 = list2.next;
	}

	// Create another list called pointer and set it equal to
	// result. We'll use this variable to keep track of where
	// in the merged list we are while looping over the two
	// input lists.
	let pointer = result;

	// We'll loop over our two linked lists with a while loop.
	// With each loop, one of the two lists will move to the
	// next node. Repeat until one of the lists has no node
	// remaining.
	while (list1 && list2) {
		if (list1.val < list2.val) {
			// If the head of list1 has a smaller value than the
			// head of list2, it should come before the head of
			// list2 in the merged list. So we set pointer.next
			// equal to list1's head, and then change the head of
			// list1 to point to its next node.
			pointer.next = list1;
			list1 = list1.next;
		} else {
			// And if list1's head's value isn't less than list2's,
			// make list2's head the next node in the pointer node.
			pointer.next = list2;
			list2 = list2.next;
		}
		// Finally, set pointer to equal its next node in order to
		// move along to the next position in the new merged list.
		pointer = pointer.next;
	}

	// Once either list1 or list2 is out of next nodes, set the
	// next node of pointer equal to the current node of the
	// remaining list. Our result will now be complete!
	pointer.next = list1 || list2;

	return result;
};
```