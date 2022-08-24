---
title: LeetCode 323. Number of Connected Components in an Undirected Graph
description: 
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the graph.

Return _the number of connected components in the graph_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
```

Example 2:

```
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1
```
</details>

<details>
<summary>Constraints</summary>

- `1 <= 2000 <= n`
- `0 <= edges.length <= 5000`
- `edges[i].length == 2`
- <code>0 <= a<sub>i</sub>, b<sub>i</sub> < n</code>
- <code>a<sub>i</sub> != b<sub>i</sub></code>
- There are no self-loops or repeated edges.
</details>

## My Solution

### Union Find

A very efficient way to count the connected components is using a union find approach. Our `union` function is called on each of our list of edges to join the nodes together into connected components. This function works by first finding the root of each of the two vertices in the edge, and then setting one of those roots to be a child of the other. Each time we do this, we decrement a count of components that we initialize to equal the number of nodes `n`. Once we've joined all nodes we can with `union`, we return the final `numberOfComponents`

Our `find` function figures out what the ultimate root of a node is, and then compresses the path by setting the ultimate root to be the direct parent of the node in question. This amortizes time complexity, from $O(n)$ on the first lookup to $O(1)$ on subsequent look-ups. Final time complexity is $O(n\:lg\text{*}\:n)$ and space complexity is `O(n)`.

```typescript
function countComponents(n: number, edges: [number, number][]) {
	// If there are 0 or 1 nodes, go ahead and return n.
	if (n <= 1) return n;

	// We initialize a parents and size array to use with
	// our find and union functions respectively. The parents
	// array stores information about a node's ultimate parent.
	// The size array is used to decide how to unify two trees,
	// such that we minimize the number of modifications needed
	// to compress the paths.
	// We also initialize a variable to keep track of how many
	// separate components we've got so far.
	const parents = Array.from({ length: n }, (_, i) => i);
	const size = Array(n).fill(1);
	let numberOfSets = n;

	// The find function will help us find a node's ultimate
	// parent. We return parents[node] only if it equals the
	// node. That is to say, if the node's parent is itself.
	// Otherwise, we recursively set parents[node] to equal
	// find(parents[node]).
	function find(node: number) {
		let root = node;
		while (root !== parents[root]) {
			root = parents[root];
		}

		// Here we implement path compression. As we go through
		// nodes, we set their parent equal to their ultimate root.
		// This reduces future look-up times from O(n) to O(1).
		while (node !== root) {
			const parent = parents[node];
			parents[node] = root;
			node = parent;
		}
		return root;
	}

	// Our union function will take our edges as pairs of root
	// nodes, and make one the parent of the other.
	function union(node1: number, node2: number) {
		// First, find the ultimate parents of the nodes.
		const root1 = find(node1);
		const root2 = find(node2);

		// If these roots differ, we'll unify the graphs.
		// The root of the smaller component will now point
		// to the larger component. Decrement the number of
		// different sets of components.
		if (root1 !== root2) {
			if (size[root1] > size[root2]) {
				parents[root2] = root1;
				size[root1] += size[root2];
			} else {
				parents[root1] = root2;
				size[root2] += size[root1];
			}
			numberOfSets--;
		}
	}

	// Call our union function on each edge. Then return
	// the final count of components.
	for (const [edge1, edge2] of edges) {
		union(edge1, edge2);
	}

	return numberOfComponents;
}
```
