---
title: 133. Clone Graph
description: Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/clone-graph/)

Given a reference of a node in a **connected** undirected graph.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

```java
class Node {
    public int val;
    public List<Node> neighbors;
}
```

### Test case format:

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with` val == 1`, the second node with `val == 2`, and so on. The graph is represented in the test case using an adjacency list.

**An adjacency list** is a collection of unordered **lists** used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with `val = 1`. You must return the **copy of the given node** as a reference to the cloned graph.

<details>
<summary>Examples</summary>
Example 1:

```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
```

Example 2:

```
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
```

Example 3:

```
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
```

</details>

<details>
<summary>Constraints</summary>


- The number of nodes in the graph is in the range `[0, 100]`.
- `1 <= Node.val <= 100`
- `Node.val` is unique for each node.
- There are no repeated edges and no self-loops in the graph.
- The Graph is connected and all nodes can be visited starting from the given node.

</details>

## My Solution

For all of the below solutions, this is the definition of `Node` that we'll use:

```typescript
class Node {
	val: number
	neighbors: Node[]
	constructor(val?: number, neighbors?: Node[]) {
		this.val = (val===undefined ? 0 : val)
		this.neighbors = (neighbors===undefined ? [] : neighbors)
	}
}
```

### Depth-First Search

Our depth-first search creates a `Map` to store the unique `Node` values and a reference to the relevant cloned `Node`. This will allow us to create new `Node`s and access them without getting stuck in a loop of recreating the same `Node`s again and again.

We define a function `clone` that takes a `Node` and checks the `Map` to see if we've made a clone of it yet. If so, we just return the clone that's in our `Map`. Otherwise, we need to create that clone `Node`. First we set a new key-value pair in the `Map`, using the `Node`'s value as the key and creating a new `Node` from that original `Node`'s value.

We immediately retrieve that key-value pair, and then set the cloned `Node`'s `neighbors` property to be equal to a new array of the original `Node`'s `neighbors` passed recursively to the `clone` function. Because we're using our `Map` to keep track of cloned `Node`s, no `Node` will get cloned more than once. If a `Node` has already been cloned, we just return that `Node` from the `Map`. We do this step separately from adding the newly-cloned `Node` to the `Map` because we otherwise get stuck in a loop—the new `Node` would not be added to the `Map` until it was done recursing over the array of `neighbors`, but the recusion cannot terminate if it never finds cloned `Node`s in the `Map`.

Finally, we can call `clone(node)` to kick off our recursive depth-first search to recreate the graph.

You could achieve the same result without creating the `clone` function if, instead, you modified the function arguments to accept an optional `Map`. Then you would pass the `Map` we initially create directly into the recursive calls, instead of having it live in the lexical scope of the `clone` function.

```typescript
function cloneGraph(node: Node | null): Node | null {
	if (node === null) return null;

	const graph = new Map<Node, Node>();

	const clone = root => {
		if (!graph.has(root)) {
			graph.set(root, new Node(root.val));
			graph.get(root).neighbors = root.neighbors.map(clone);
		}
		return graph.get(root);
	}

	return clone(node);
};
```

### Breadth-First Search

Unlike our depth-first search, the breadth-first search is iterative rather than recursive. Again we create a `Map` to keep track of nodes we've visited. But now we also create a `queue` to keep track of `Node`s for which we need to add their neighbors to the cloned graph.

As long as there are `Node`s in the `queue`, we will `shift` the first item out of the `queue` to process it. For each neighbor in that `Node`, we'll see if the neighbor already exists in the `Map`. If not, we add the neighbor `Node` to the `Map` and to the `queue` to process _its_ neighbors. Finally, we add each of the cloned neighbor nodes to the `neighbors` property of the `Node` we pulled from our `queue`.

Once the `queue` is empty, we've traversed the graph and cloned every `Node`. We just need to return the first cloned `Node` from our `Map` to return the new graph.

```typescript
function cloneGraph(node: Node | null): Node | null {
	if (node === null) return null;

	const graph = new Map<Node, Node>();
	graph.set(node, new Node(node.val));
	const queue: Node[] = [node];
	while (queue.length) {
		const currentNode = queue.shift();
		currentNode.neighbors.forEach(neighbor => {
			if (!graph.has(neighbor)) {
				graph.set(neighbor, new Node(neighbor.val));
				queue.push(neighbor);
			}
			graph.get(currentNode).neighbors.push(graph.get(neighbor));
		})
	}
	return graph.get(node);
};
```