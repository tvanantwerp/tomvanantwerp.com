---
title: 200. Number of Islands
description: Given a 2D binary grid which represents a map of land and water, return the number of islands.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/number-of-islands/)

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return _the number of islands_.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

<details>
<summary>Examples</summary>

Example 1:

```
Input: grid = [
	["1","1","1","1","0"],
	["1","1","0","1","0"],
	["1","1","0","0","0"],
	["0","0","0","0","0"]
]
Output: 1
```

Example 2:

```
Input: grid = [
	["1","1","0","0","0"],
	["1","1","0","0","0"],
	["0","0","1","0","0"],
	["0","0","0","1","1"]
]
Output: 3
```
</details>

<details>
<summary>Constraints</summary>


- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.
</details>

## My Solution

### Depth First Search

This problem is fairly straightforward. We can just start iterating through the grid, and calling a depth first search function `dfs` on any cell equal to `'1'`. Our `dfs` function mutates the grid to make any visited square equal to neither `'0'` nor `'1'`. This means that we'll only ever call `dfs` on a contiguous island once, as future visits to cells that are part of the island won't trigger the function call anymore. We simply store the number of these initial calls to `dfs` in a `count` variable and return it to get the number of islands.

```typescript
function numIslands(grid: string[][]): number {
	let count = 0;
	for (let row = 0; row < grid.length; row++) {
		for (let column = 0; column < grid[0].length; column++) {
			// Since we overwrite grid cells in our dfs function,
			// the first piece of land we find for every island
			// is the only time we call dfs inside this loop
			// directly. Thus, we can increment count by one here.
			if (grid[row][column] === '1') {
				count++;
				dfs(grid, row, column);
			}
		}
	}

	return count;
}

function dfs(matrix: string[][], row: number, column: number) {
	// We return early if we have invalid coordinates or water.
	if (
		row < 0 ||
		column < 0 ||
		row >= matrix.length ||
		column >= matrix[0].length ||
		matrix[row][column] !== '1'
	)
		return;

	// Otherwise, we mutate the value of the matrix at the
	// coordinates so we won't accidentally count it again later.
	// This ensures we call dfs from numIslands just once per
	// island. After mutation, we recursively call dfs again on
	// the cells above, below, left, and right of the current
	// cell.
	matrix[row][column] = '✅';
	dfs(matrix, row + 1, column);
	dfs(matrix, row - 1, column);
	dfs(matrix, row, column + 1);
	dfs(matrix, row, column - 1);
}
```

## Breadth First Search

Our breadth first search solution is similar to the depth first search. In this case, we also create a `queue` to iterate over. Instead of recursively calling `bfs` as we did with `dfs`, we just add new cells to the `queue`.

```typescript
function numIslands(grid: string[][]): number {
	let count = 0;
	let queue: [number, number][] = [];
	for (let row = 0; row < grid.length; row++) {
		for (let column = 0; column < grid[0].length; column++) {
			// Since we overwrite grid cells in our bfs function,
			// the first piece of land we find for every island
			// is the only time we call bfs inside this loop
			// directly. Thus, we can increment count by one here.
			if (grid[row][column] === '1') {
				count++;
				bfs(grid, row, column);
			}
		}
	}

	function bfs(matrix: string[][], row: number, column: number) {
		// Add the initial coordinates we called with to the queue.
		queue.push([row, column]);
		while (queue.length) {
			// Get new coordinates from the queue.
			const [r, c]: [number, number] = queue.shift()!;

			// We skip this loop if we have invalid coordinates
			// or we're on water.
			if (
				r < 0 ||
				c < 0 ||
				r >= matrix.length ||
				c >= matrix[0].length ||
				matrix[r][c] !== '1'
			)
				continue;

			// Otherwise, mark this cell as visited and add
			// neighbors to the end of the queue.
			matrix[r][c] = '✅';
			queue.push([r + 1, c]);
			queue.push([r - 1, c]);
			queue.push([r, c + 1]);
			queue.push([r, c - 1]);
		}
	}

	return count;
}
```