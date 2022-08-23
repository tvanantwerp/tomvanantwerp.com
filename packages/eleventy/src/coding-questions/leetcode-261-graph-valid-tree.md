---
title: LeetCode 261. Graph Valid Tree
description: Write a function to check whether a list of node edges make up a valid tree.
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/graph-valid-tree/)

Given `n` nodes labeled from `0` to `n - 1` and a list of undirected `edges` (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

**Note**: You can assume that no duplicate edges will appear in `edges`. Since all edges are undirected, `[0, 1]` is the same as `[1, 0]` and thus will not appear together in `edges`.

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

## My Solution

### Depth First Search

```typescript
function validTree(n: number, edges: [number, number][]) {
  // If there are no nodes, go ahead and return true.
  // A tree with 0 nodes is technically a valid tree.
  if (n === 0) return true;

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
