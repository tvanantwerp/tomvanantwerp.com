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
        <td class="ocean pacific" rowspan="6">&nbsp;</td>
        <td class="ocean pacific" colspan="7">Pacific Ocean</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td class="result-island">5</td>
        <td class="ocean atlantic" rowspan="6">&nbsp;</td>
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

You've got a rectangular island between the Pacific and Atlantic Oceans. The island can be mapped as a `m x n` grid, and each grid square's height can be represented as an integer. When rain falls on one of the island's grid squares, it flows north, south, east, and west _if_ those adjacent grids have equal or lesser height. Our task is to determine which grid squares have a path for the rain to _both_ the Pacific and Atlantic Oceans.


