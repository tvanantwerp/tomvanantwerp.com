---
title: LeetCode 11. Container with Most Water
description: Find two lines that together with the x-axis form a container, such that the container contains the most water.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/container-with-most-water/)

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`<sup>th</sup> line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return _the maximum amount of water a container can store_.

**Notice** that you may not slant the container.

<details>
<summary>Examples</summary>

Example 1

![Bar chart representing the array height and drawing a blue rectangle across is denoting the maximum area of water possible.](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

Example 2:

```
Input: height = [1,1]
Output: 1
```

</details>

<details>
<summary>Constraints</summary>

- `n == height.length`
- 2 <= `n` <= 10<sup>5</sup>
- 0 <= `height[i]` <= 10<sup>4</sup>
</details>

## My Solution

We're imagining creating a container of water from two out of `n` sides, maximizing the amount of water we can hold by choosing the best sides for the job. This means that the area we're computing is restricted to the smaller of the two sides we use, because that's where water would flow out if you tried to add more. We are pretending any sides between the two we're choosing don't exist.

To solve this problem in $O(n)$ time, we start by comparing the outermost sides. We store that area in our `maxArea` variable, then remove from the array whichever of those sides was smaller. (Remember: the smaller side is the limiting factor, so that's why we always remove the smaller one.) Now we compare again with the modified array to see if we've got a new maximum area. Repeat until there are only two sides in the array left, and by then you'll have found the maximum area.

```javascript
const maxArea = height => {
	let maxArea = 0;

	while (height.length > 1) {
		// The area will equal the lesser of the first and last
		// height in the array, multiplied by the distance between
		// them.
		const distance = height.length - 1;
		const area = Math.min(height[0], height[distance]) * distance;
		if (area > maxArea) {
			// If this new area is greater than any previously seen
			// area, set it to be the new maximum.
			maxArea = area;
		}

		// Otherwise, we'll lop off the smaller of the first or the
		// last array element and compare again until there's
		// nothing left to compare.
		if (height[0] <= height[distance]) {
			height.shift();
		} else {
			height.pop();
		}
	}

	return maxArea;
};
```
