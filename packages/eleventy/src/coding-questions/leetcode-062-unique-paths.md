---
title: 62. Unique Paths
description: Given a grid with height m and width n, calculate the unique paths from the top-left corner to the bottom-right corner while moving only right or down.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/unique-paths/)

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return _the number of possible unique paths that the robot can take to reach the bottom-right corner_.

The test cases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.

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

Our recursive solution is top-down; we try to count starting from `m` and `n` back to `[0, 0]`. For whatever coordinate we are at, we will recursively call this function on the pair of coordinates one above and one to the left. The sum of those recursive calls gives us the number of unique paths from that point. The base case is when either `m` or `n` equals `1`, because then there's only one straight path back to `[0, 0]`.

```typescript
// To make the recusive function performant, we add a memo
// argument that defaults to an empty Map.
function uniquePaths(m: number, n: number, memo: Map<string, number> = new Map()): number {
	// When the coordinates have you at either [1, n] or [m, 1],
	// there is only one straight path back to [0, 0]. So
	// return 1.
	if (m === 1 || n === 1) return 1;
	// To avoid duplicate calculations for the same coordinate
	// pairs, we check to see if this pair was already
	// computed and added to the cache—return it if so.
	if (memo.has(`m${m}n${n}`)) return memo.get(`m${m}n${n}`);

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
	memo.set(`m${m}n${n}`, mPath + nPath);
	// Finally, return the sum of paths.
	return mPath + nPath;
};
```