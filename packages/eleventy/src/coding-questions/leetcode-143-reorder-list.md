---
title: LeetCode 143. Reorder List
description: You are given the head of a singly linked-list ordered 0 to n. Re-order it to the form 0, n, 1, n-1, etc.
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/reorder-list/)

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
- `1 <= Node.val <= 1000`
</details>

## My Solution
