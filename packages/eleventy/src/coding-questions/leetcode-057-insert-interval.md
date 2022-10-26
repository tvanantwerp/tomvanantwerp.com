---
title: LeetCode 57. Insert Interval
description: Insert a new interval into existing intervals such that intervals is still sorted in ascending order by start time, and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
---

## The Problem

[Link to original problem on LeetCode.](https://leetcode.com/problems/insert-interval/)

You are given an array of non-overlapping intervals `intervals` where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> represent the start and the end of the <code>i<sup>th</sup></code> interval and `intervals` is sorted in ascending order by <code>start<sub>i</sub></code>. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by <code>start<sub>i</sub></code> and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` _after the insertion_.

<details>
<summary>Examples</summary>

Example 1:

```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

Example 2:

```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```
</details>

<details>
<summary>Constraints</summary>


- <code>0 <= intervals.length <= 10<sup>4</sup></code>
- `intervals[i].length == 2`
- <code>0 <= start<sub>i</sub> <= end<sub>i</sub> <= 10<sup>5</sup></code>
- `intervals` is sorted by <code>start<sub>i</sub></code> in **ascending** order.
- `newInterval.length == 2`
- <code>0 <= start <= end <= 10<sup>5</sup></code>

</details>

## My Solution

There are three potential outcomes as we iterate over the array of intervals:

1. The interval ends before the new interval, so we can just add it to the end of the `result`.
2. The new interval ends before the current interval, so we can append both the new/merged interval and all of the remaining intervals to our `result`.
3. The current interval overlaps with the new interval.

The only potentially tricky case is #3. In the case of overlapping intervals, we may need to merge them. We'll do this with a new `mergedInterval` variable initialized to equal `newInterval`. As we iterate across intervals, so long as there is overlap, we will update `mergedInterval` to have the lesser start time of `mergedInterval` and the current interval and to have the greater end time of `mergedInterval` and the current interval. Once we reach a point in our iteration over `interval` where there is no longer overlap, we handle case #2 and return `result`.

Time and space complexity are both $O(n)$.

```typescript
function insert(
  intervals: [number, number][],
  newInterval: [number, number],
): [number, number][] {
  // Initialize a merged interval using the newInterval.
  const mergedInterval: [number, number] = newInterval;
  const result: [number, number][] = [];

  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][1] < mergedInterval[0]) {
      // If the current interval ends before the new interval,
      // we can safely add it to the result.
      result.push(intervals[i]);
    } else if (mergedInterval[1] < intervals[i][0]) {
      // If the new/merged interval ended before this one
      // begins, we can safely return the combination of the
      // result so far, mergedInterval, and the remainder of
      // the intervals.
      result.push(mergedInterval, ...intervals.slice(i));
      return result;
    } else {
      // Otherwise, time to merge. Update in place the start
      // and end times of the mergedInterval variable to be the
      // minimum and maximum of what they currently are versus
      // this interval respectively.
      mergedInterval[0] = Math.min(intervals[i][0], mergedInterval[0]);
      mergedInterval[1] = Math.max(intervals[i][1], mergedInterval[1]);
    }
  }
  result.push(mergedInterval);

  return result;
}
```
