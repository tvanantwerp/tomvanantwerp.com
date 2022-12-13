---
title: LeetCode 56. Merge Intervals
description: Given an array of intervals, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/merge-intervals/)

Given an array of `intervals` where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return _an array of the non-overlapping intervals that cover all the intervals in the input_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

Example 2:

```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

</details>

<details>
<summary>Constraints</summary>

- <code>1 <= intervals.length <= 10<sup>4</sup></code>
- `intervals[i].length == 2`
- <code>0 <= start<sub>i</sub> <= end<sub>i</sub> <= 10<sup>4</sup></code>

</details>

## My Solution

Note that we are not told that intervals will be sorted by start time. Having them sorted makes it much easier to merge overlapping intervals, as we don't need to search the array for adjacent intervals. First we sort, which has a time complexity of $O(n \log n)$. After sorting, we iterate through `intervals` and check whether each overlaps with the previous interval in our `result` array (which is initialized with the first interval in the sorted `intervals` array). If there is overlap, we simply update the end time of the last interval in `result`. Finally, return `result`.

Total time complexity is $O(n \log n)$. Space complexity is $O(n)$.

```typescript
function merge(intervals: [number, number][]): [number, number][] {
	// First make sure intervals are sorted by start time.
	intervals.sort((a, b) => {
		return a[0] - b[0];
	});

	// Initialize the result array with the first interval.
	const result: [number, number][] = [intervals[0]];

	// Then loop through intervals and merge them.
	for (let i = 1; i < intervals.length; i++) {
		if (result[result.length - 1][1] < intervals[i][0]) {
			// If the end of the previous result is before the start
			// of the current interval, then they don't overlap.
			// Push the current interval to result.
			result.push(intervals[i]);
		} else {
			// If they do overlap, update the end time of the previous
			// interval in result to be the maximum of itself and
			// the current interval's end time.
			result[result.length - 1][1] = Math.max(
				result[result.length - 1][1],
				intervals[i][1],
			);
		}
	}

	return result;
}
```
