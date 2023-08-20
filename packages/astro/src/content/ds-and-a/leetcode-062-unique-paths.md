---
title: 62. Unique Paths
description: Given a grid with height m and width n, calculate the unique paths from the top-left corner to the bottom-right corner while moving only right or down.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/unique-paths/)

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return _the number of possible unique paths that the robot can take to reach the bottom-right corner_.

The test cases are generated so that the answer will be less than or equal to <code>2 \* 10<sup>9</sup></code>.

<details>
<summary>Examples</summary>

Example 1:

```
Input: m = 3, n = 7
Output: 28
```

Example 2:

```
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

</details>

<details>
<summary>Constraints</summary>

- `1 <= m, n <= 100`
</details>

## My Solution

This is a dynamic programming problem, and can be solved either recursively or iteratively.

### Recusion with Memoization

Our recursive solution is top-down; we try to count starting from `m` and `n` back to `[0, 0]`. For whatever coordinate we are at, we will recursively call this function on the pair of coordinates one above and one to the left. The sum of those recursive calls gives us the number of unique paths from that point. The base case is when either `m` or `n` equals `1`, because then there's only one straight path back to `[0, 0]`. Time and space complexity is $$O(m \times n)$$.

```typescript
// To make the recusive function performant, we add a memo
// argument that defaults to an empty Map.
function uniquePaths(
	m: number,
	n: number,
	memo: Map<string, number> = new Map(),
): number {
	// When the coordinates have you at either [1, n] or [m, 1],
	// there is only one straight path back to [0, 0]. So
	// return 1.
	if (m === 1 || n === 1) return 1;
	// To avoid duplicate calculations for the same coordinate
	// pairs, we check to see if this pair was already
	// computed and added to the cache—return it if so.
	if (memo.has(`m$${m}n$${n}`)) return memo.get(`m$${m}n$${n}`);

	// To discover the number of unique paths from the current
	// coordinates, we recursively call the function with both
	// m and n decremented by 1. The sum of these two calls
	// equals the unique number from our current point on the
	// grid. If one of the pair is zero, don't call the function
	// but use the value 0—otherwise we'll calculate endlessly
	// into negative coordinates.
	const mPath = m > 0 ? uniquePaths(m - 1, n, memo) : 0;
	const nPath = n > 0 ? uniquePaths(m, n - 1, memo) : 0;

	// Cache the calculated coordinate pair in memo.
	memo.set(`m$${m}n$${n}`, mPath + nPath);
	// Finally, return the sum of paths.
	return mPath + nPath;
}
```

### Iterative Dynamic Programming

In the iterative approach, we create a 2D array to serve as our grid. Inside each cell of the 2D array, we'll store the sum of unique paths to that cell. We start at the cell one space down and one space right of the upper-left cell. From here, looping across and down the 2D array, we fill each cell with the sum of the cells immediately left and up from it to get the sum of unique paths to that cell. Once we've filled the entire 2D array, the last cell will contain the number of unique paths. Once again, time and space complexity is $$O(m \times n)$$.

```typescript
function uniquePaths(
	m: number,
	n: number,
	memo: Map<string, number> = new Map(),
): number {
	// We create out 2D array of m x n cells, and initialize it
	// all to 1.
	const dp: number[][] = Array.from({ length: m }, () =>
		Array.from({ length: n }, () => 1),
	);

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			// The number of paths to dp[i][j] is equal to the sum
			// of paths to the space immediately above and left of it.
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
		}
	}

	// Return the value of the last space on the 2D grid.
	return dp[m - 1][n - 1];
}
```

We can actually improve on this! With each inner-loop iteration, we reference the row of `dp` immediately above it. We don't _really_ need to save every previously-computed row as a row in a 2D array. It's enough to use only a 1D array, and adding to each value in that array with every iteration of the inner loop. So, instead of `dp[i][j] = dp[i - 1][j] + dp[i][j - 1]`, we can have something like `row[j] += row[j - 1]`. We fold every inner loop's set of computations into the previously computed row! Our time complexity is still $$O(m \times n)$$, but our space complexity is down to just $$O(n)$$.

```typescript
function uniquePaths(
	m: number,
	n: number,
	memo: Map<string, number> = new Map(),
): number {
	const row = Array.from({ length: n }, () => 1);

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			row[j] += row[j - 1];
		}
	}

	return row[n - 1];
}
```
