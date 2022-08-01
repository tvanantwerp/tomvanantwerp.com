---
title: 417. Pacific Atlantic Water Flow
description: Given an m x n rectangular island between two oceans, return the grid cells of the island where rain could flow into both oceans.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/pacific-atlantic-water-flow/)

There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the height above sea level of the cell at coordinate `(r, c)`.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal** to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return _a **2D list** of grid coordinates_ `result` _where_ <code>result[i] = [r<sub>i</sub>, c<sub>i</sub>]</code> _denotes that rain water can flow from cell_ <code>(r<sub>i</sub>, c<sub>i</sub>)</code> _to both the Pacific and Atlantic oceans_.

<details>
<summary>Examples</summary>

Example 1:

<style>
	.result-island {
		background-color: var(--color);
		color: var(--background-color);
	}

	.ocean {
		border: none;
		text-align: center;
	}

	.atlantic {
		background-color: var(--green-highlight);
		color: var(--light-color);
	}

	.pacific {
		background-color: var(--blue-highlight);
		color: var(--dark-color);
	}
</style>
<table>
	<tr>
		<td class="ocean pacific" colspan="7">Pacific Ocean</td>
	</tr>
	<tr>
		<td class="ocean pacific" rowspan="5">&nbsp;</td>
		<td>1</td>
		<td>2</td>
		<td>2</td>
		<td>3</td>
		<td class="result-island">5</td>
		<td class="ocean atlantic" rowspan="5">&nbsp;</td>
	</tr>
	<tr>
		<td>3</td>
		<td>2</td>
		<td>3</td>
		<td class="result-island">4</td>
		<td class="result-island">4</td>
	</tr>
	<tr>
		<td>2</td>
		<td>4</td>
		<td class="result-island">5</td>
		<td>3</td>
		<td>1</td>
	</tr>
	<tr>
		<td class="result-island">6</td>
		<td class="result-island">7</td>
		<td>1</td>
		<td>4</td>
		<td>5</td>
	</tr>
	<tr>
		<td class="result-island">5</td>
		<td>1</td>
		<td>1</td>
		<td>2</td>
		<td>4</td>
	</tr>
	<tr>
		<td class="ocean atlantic" colspan="7">Atlantic Ocean</td>
	</tr>
</table>

```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

Example 2:

```
Input: heights = [[2,1],[1,2]]
Output: [[0,0],[0,1],[1,0],[1,1]]
```
</details>

<details>
<summary>Constraints</summary>


- `m == heights.length`
- `n == heights[r].length`
- `1 <= m, n <= 200`
- <code>0 <= heights[r][c] <= 10<sup>5</sup></code>

</details>

## My Solution

### Wait, What?

This problem is, in my opinion, poorly phrased. Let's translate:

You've got a rectangular island between the Pacific and Atlantic Oceans. The island can be mapped as a `m x n` grid (`m` is rows, `n` is columns), and each grid square's height can be represented as an integer. When rain falls on one of the island's grid squares, it flows north, south, east, and west _if_ those adjacent grids have equal or lesser height. Our task is to determine which grid squares have a path for the rain to flow into _both_ the Pacific and Atlantic Oceans.

### Approach to Problem

There are some key insights that will help us solve this problem. Our intuition—being intimately familiar with the effects of gravity on rainfall—is to look for high peaks and see where things flow from there. But that's not necessary!

What we really want to know is, "Is there a path between this cell and the ocean where each cell between this one and the ocean has a height of equal or lesser value?". Rephrased, we could also ask, "How far from the ocean's shore can I get by only going to neighbor cells with height equal to or greater than my current cell?" This means we can "reverse" gravity, and trace a path from our oceans up to the peaks! This gives us an easier to use starting point, since we know where the shorelines are without needed to traverse anything.

Starting from one ocean's shore, we can create a list of all cells that ultimately drain into that ocean. If we do the same for both oceans, then all we need to do to find our answer is to return the overlap of those two lists!

### Depth First Search

Our depth first search will start at the shorelines of each ocean and proceed inward until the neighbors of the current cell are no longer increasing in height. Whether or not we've already visited a specific cell is kept track of in `atlantic` and `pacific`—if we have traversed a cell, we return from `dfs` immediately to skip it. As we traverse, we check to see if the current cell shows up in bth `atlantic` and `pacific`, and add it to the `answer` if so. Doing this within `dfs` and not as a separate step after we are done with `dfs` saves us the trouble of iterating through a loop of `heights.length * heights[0].length` again at the end.

```typescript
function pacificAtlantic(heights: number[][]): number[][] {
  // Go ahead and return [] early if the island doesn't exist.
	if (!heights.length) return heights;

	// Initialize a ton of variables. We'll keep track of the
	// island dimensions (rows and columns), which cells
	// ultimately drain to each ocean, and an answer array
	// to consolidate the union of the atlantic and pacific
	// arrays of cells. The atlantic and pacific arrays of arrays
	// are initialized to false for each cell.
	const rows = heights.length,
		columns = heights[0].length,
		atlantic: boolean[][] = Array.from({ length: rows }, () =>
			Array(columns).fill(false),
		),
		pacific: boolean[][] = Array.from({ length: rows }, () =>
			Array(columns).fill(false),
		),
		answer: number[][] = [];

	// For each row, we'll call our dfs function on the zeroth
	// column for the pacific and the last column of the atlantic.
	// This will initiate depth first search on the left-most
	// cells bordering the Pacific Ocean and the right-most cells
	// bordering the Atlantic Ocean.
	for (let i = 0; i < rows; i++) {
		dfs(pacific, i, 0);
		dfs(atlantic, i, columns - 1);
	}
	// Now call dfs on every column in the top row (abuts the
	// Pacific Ocean) for pacific and every column in the bottom
	// row (abuts the Atlantic Ocean) for atlantic.
	for (let i = 0; i < columns; i++) {
		dfs(pacific, 0, i);
		dfs(atlantic, rows - 1, i);
	}

	// Having called dfs on every cell neighboring an ocean,
	// the dfs function will have finished updating our
	// answer array with the intersection of pacific and
	// atlantic. We may now return it.
	return answer;

	// Our depth first search (dfs) function will visit every
	// cell that it can, starting from a given ocean's shore
	// and working up to the peaks. Once faced with a neighbor
	// that isn't equal or increasing in height, it will not
	// iterate over that neighbor. The eventual result of the
	// dfs call is an array of arrays naming every cell that
	// does indeed drain to the initial ocean passed to it.
	// To save the trouble of iterating through [rows, columns]
	// again after our dfs calls, we go ahead and check for
	// intersections of the two ocean arrays here and update our
	// answer array accordingly.
	function dfs(visited: boolean[][], row: number, column: number) {
		// Base case. We checked this cell, so skip it.
		if (visited[row][column]) return;

		// Set this cell to visited in the ocean we passed in.
		visited[row][column] = true;

		// Check to see if this cell has been visited in both
		// oceans' arrays. If so, we know it drains into both,
		// and we can add this cell to our answer.
		if (atlantic[row][column] && pacific[row][column])
			answer.push([row, column]);

		// Call dfs on all of the cell's neighbors on two
		// conditions: the neighbor must exist, and the
		// neighbor must be of equal or greater height.
		if (row + 1 < rows && heights[row + 1][column] >= heights[row][column]) {
			dfs(visited, row + 1, column);
		}
		if (row - 1 >= 0 && heights[row - 1][column] >= heights[row][column]) {
			dfs(visited, row - 1, column);
		}
		if (
			column + 1 < columns &&
			heights[row][column + 1] >= heights[row][column]
		) {
			dfs(visited, row, column + 1);
		}
		if (column - 1 >= 0 && heights[row][column - 1] >= heights[row][column]) {
			dfs(visited, row, column - 1);
		}
	}
}
```

### Breadth First Search

Our breadth first search implementation is very similar to the depth first search. We set everything up the same way (plus initialize a `queue`), and just swap `dfs` for a new `bfs` function. This new function adds the coordinates passed to it to the `queue`, and then loops over the `queue`. If a cell is newly visited, we check for neighbors that 1) exist and 2) are over greater height, and add them to the `queue`.

```typescript
function pacificAtlantic(heights: number[][]): number[][] {
  // Go ahead and return [] early if the island doesn't exist.
	if (!heights.length) return heights;

	// Initialize a ton of variables. We'll keep track of the
	// island dimensions (rows and columns), which cells
	// ultimately drain to each ocean, and an answer array
	// to consolidate the union of the atlantic and pacific
	// arrays of cells. The atlantic and pacific arrays of arrays
	// are initialized to false for each cell. Unlike the dfs
	// solution, we also initialize an empty queue.
	const rows = heights.length, columns = heights[0].length,
		  atlantic: boolean[][] = Array.from({length: rows}, () => {
			  return Array(columns).fill(false);
		  }),
		  pacific: boolean[][] = Array.from({length: rows}, () => {
			  return Array(columns).fill(false);
		  }),
		  queue: number[][] = [],
		  answer: number[][] = [];

	// For each row, we'll call our bfs function on the zeroth
	// column for the pacific and the last column of the atlantic.
	// This will initiate depth first search on the left-most
	// cells bordering the Pacific Ocean and the right-most cells
	// bordering the Atlantic Ocean.
	for (let i = 0; i < rows; i++) {
		bfs(pacific, i, 0);
		bfs(atlantic, i, columns - 1);
	}
	// Now call bfs on every column in the top row (abuts the
	// Pacific Ocean) for pacific and every column in the bottom
	// row (abuts the Atlantic Ocean) for atlantic.
	for (let i = 0; i < columns; i++) {
		bfs(pacific, 0, i);
		bfs(atlantic, rows - 1, i);
	}

	// Having called bfs on every cell neighboring an ocean,
	// the bfs function will have finished updating our
	// answer array with the intersection of pacific and
	// atlantic. We may now return it.
	return answer;

	function bfs(visited: boolean[][], row: number, column: number) {
		// First, whatever row and column gets passed to bfs,
		// we add it to the queue.
		queue.push([row, column]);

		// Now that we're sure our queue has some cells in it,
		// we can start iterating.
		while (queue.length) {
			// Pull the first item from the front of the queue.
			const [r, c] = queue.shift();

			// Unlike in dfs, here we continue rather than return
			// if we've visited this node. Using return would
			// prematurely terminate the function, whereas continue
			// just goes to the next loop iteration. If we haven't
			// visited this cell, we can now mark it as visited.
			if (visited[r][c]) continue;
			visited[r][c] = true;

			// We perform the same checks as we did for dfs, but
			// instead of recursively calling our function as we
			// did there, we just push new coordinates to check
			// into our queue.
			if (atlantic[r][c] && pacific[r][c]) answer.push([r, c]) ;
			if (r + 1 < rows && heights[r + 1][c] >= heights[r][c]) {
				queue.push([r + 1, c]);
			}
			if (r - 1 >= 0 && heights[r - 1][c] >= heights[r][c]) {
				queue.push([r - 1, c]);
			}
			if (c + 1 < columns && heights[r][c + 1] >= heights[r][c]) {
				queue.push([r, c + 1]);
			}
			if (c - 1 >= 0 && heights[r][c - 1] >= heights[r][c]) {
				queue.push([r, c - 1]);
			}
		}
	}
};
```