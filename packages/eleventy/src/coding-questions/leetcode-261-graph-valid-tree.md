---
title: LeetCode 261. Graph Valid Tree
description: Write a function to check whether a list of node edges make up a valid tree.
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/graph-valid-tree/)

You have a graph of `n` nodes labeled from `0` to `n - 1`. You are given an integer `n` and a list of `edges` where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an undirected edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the graph.

Return `true` _if the edges of the given graph make up a valid tree, and_ `false` _otherwise_.

<details>
<summary>Examples</summary>

Example 1

```
Input: n = 5 edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
Output: true.
```

Example 2:

```
Input: n = 5 edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
Output: false.
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

### Depth First Search

In our depth first search solution, we'll start by creating an adjacency list of each node's neighbors. Then we'll recursively traverse the graph, keeping track of nodes we've visited before. If we re-encounter a node, we've got a cycle and it's not a valid tree. Otherwise, if no cycles are detected, we compare the length of the set of visited nodes to the total number of nodes to make sure there aren't any unconnected nodes—that would also make an invalid tree. If we managed to traverse each node just once, then it's a valid tree!

Time and space complexity are $O(V + E)$, where $V$ is the count of nodes (vertices), and $E$ is the count of edges.

```typescript
function validTree(n: number, edges: [number, number][]) {
	// If there are no nodes, go ahead and return true.
	// A tree with 0 nodes is technically a valid tree.
	if (n === 0) return true;

	// A valid tree will always have n nodes and n - 1 edges.
	// If that's not true, return false.
	if (n - 1 !== edges.length) return false;

	// First, create an adjacency list of each node's neighbors.
	// Let's initialize it with an empty set for each node.
	const adjacencyList = new Map<number, Set<number>>(
		Array.from({ length: n }, (v, i) => [i, new Set<number>()]),
	);
	// Because this graph is undirected, you need to add the
	// neighbors to both sides of the edge.
	edges.forEach(([v1, v2]) => {
		adjacencyList.get(v1)!.add(v2);
		adjacencyList.get(v2)!.add(v1);
	});

	// Now we'll implement our depth first search.
	// First, initialize a set to track nodes we've visited.
	const visited = new Set<number>();

	// Now we create our depth first search function.
	// We'll set the previous arg to default to -1,
	// since the lowest numbered node we will receive
	// is zero.
	function dfs(node: number, previous = -1) {
		// If we've seen this node before, we're in a loop!
		if (visited.has(node)) return false;

		// Otherwise, mark this node visited.
		visited.add(node);
		// Now, recursively call dfs on this node's neighbors.
		for (const neighbor of adjacencyList.get(node)!) {
			// Important! The last node we just came from is
			// still a neighbor of this node, because the graph
			// is undirected. So we continue if the neighbor is
			// the same as the previous now.
			if (neighbor === previous) continue;
			// Otherwise, if our recursive call returned false,
			// we should return false from this call too.
			if (!dfs(neighbor, node)) return false;
		}

		// If nothing went wrong, return true.
		return true;
	}

	// Finally, return a call to the starting node of our
	// graph and a check to make sure we visited all of
	// the nodes—an unconnected node would be an invalid
	// tree.
	return dfs(0) && visited.size === n;
}
```

### Union Find

Another approach to solving this problem is to use union and find operations. This approach will use our list of edges to attempt to create a unified tree from all of our individual nodes. To do this, it finds the ultimate root nodes for a given edge's vertices. In a valid tree, each edge we pass to the union function should result in joining to separate graphs. If they already share a root, then we know we're in a cycle and the tree is invalid. We do this for each edge—if we get all the way through without detecting a cycle, then we still need to make sure we've created one single graph. If so, we can return true.

The advantage of the union-find approach is that we can amortize time complexity. We use a technique called path compression to set the immediate parent of each node equal to the ultimate parent. This means that the first time we look up the ultimate parent of a node, it takes $O(n)$ time; but on subsequent look-ups, it only costs $O(1)$. Using path compression gets us time complexity of $O(n\:lg\text{*}\:n)$, which is better than $O(n \log n)$. Space complexity is only $O(n)$ for the number of nodes.

```typescript
function validTree(n: number, edges: [number, number][]) {
	// If there are no nodes, go ahead and return true.
	// A tree with 0 nodes is technically a valid tree.
	if (n === 0) return true;
	if (n - 1 !== edges.length) return false;

	// We initialize a parents and size array to use with
	// our find and union functions respectively. The parents
	// array stores information about a node's ultimate parent.
	// The size array is used to decide how to unify two trees,
	// such that we minimize the number of modifications needed
	// to compress the paths.
	// We also initialize a variable to keep track of how many
	// separate trees we've got so far.
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

		// If these roots differ, we'll unify the trees.
		// The root of the smaller tree will now point
		// to the larger tree. Decrement the number of
		// different sets of trees.
		if (root1 !== root2) {
			if (size[root1] > size[root2]) {
				parents[root2] = root1;
				size[root1] += size[root2];
			} else {
				parents[root1] = root2;
				size[root2] += size[root1];
			}
			numberOfSets--;
			return true;
		}

		// If, however, the roots are the same, then we've
		// detected a cycle! Return false.
		return false;
	}

	// Finally, we check to see if we can successfully unify
	// all of the nodes based on their edges. If any union fails,
	// return false. Finally, if no failures, return true.
	for (const [edge1, edge2] of edges) {
		if (!union(edge1, edge2)) return false;
	}

	// If we're down to a single tree, then we know it's valid.
	return numberOfSets === 1;
```