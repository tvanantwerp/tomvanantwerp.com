---
title: LeetCode 435. Non-overlapping Intervals
description: Given an array of intervals, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/non-overlapping-intervals/)

Given an array of intervals `intervals` where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, return _the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
```

Example 2:

```
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
```

Example 3:

```
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
```

</details>

<details>
<summary>Constraints</summary>

- <code>1 <= intervals.length <= 10<sup>5</sup></code>
- `intervals[i].length == 2`
- <code>-5 \* 10<sup>4</sup> <= start<sub>i</sub> < end<sub>i</sub> <= 5 \* 10<sup>4</sup></code>

</details>

## My Solution

Similarly to [56. Merge Intervals](/coding-questions/leetcode-056-merge-intervals/), we'll start by sorting our intervals. This sort has a time complexity of $O(n \log n)$. After sorting, we initialize `end` and `count` variables. The `end` keeps track of the last interval end we've seen, and we'll initialize it to the first interval's end at `intervals[0][1]`. The `count` will be used to keep track of how many non-overlapping intervals we encounter. Iterate through `intervals` and check whether each start overlaps with the previous end. If there is no overlap, we increment the count of non-overlapping intervals—otherwise do nothing. Finally, return the length of the `intervals` array less the `count` to know how many intervals we would need to remove to have no overlaps.

Total time complexity is $O(n \log n)$. Space complexity is $O(1)$, as `end` and `count` don't consume any more memory in proportion to increases in length of `intervals`.

```typescript
function eraseOverlapIntervals(intervals: number[][]): number {
	if (intervals.length === 0) return 0;

	intervals.sort((a, b) => {
		return a[1] - b[1];
	});

	let end = intervals[0][1];
	let count = 1;

	for (let i = 1; i < intervals.length; i++) {
		if (intervals[i][0] >= end) {
			end = intervals[i][1];
			count++;
		}
	}

	return intervals.length - count;
}
```
