---
title: 207. Course Schedule
description: Given a number of courses to take and a list of prerequisites, determine if it's possible to take all the courses you need.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/course-schedule/)

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you must take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

<details>
<summary>Examples</summary>

Example 1:

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
```

Example 2:

```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```
</details>

<details>
<summary>Constraints</summary>


- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- <code>0 <= a<sub>i</sub>, b<sub>i</sub> < numCourses</code>
- All the pairs `prerequisites[i]` are unique.

</details>

## My Solution

```typescript
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	// First, we will initialize a graph variable, which is an
	// array of length numCourses filled with empty arrays. This
	// graph will be an adjacency list. The array at each index i
	// will represent the new courses enabled by taking course i.
	const graph: number[][] = Array.from({length: numCourses}, () => []);
	// Second, we create a variable to store each node's
	// indegrees. The indegree of a node is the count of incoming
	// directed edges. In the case of this problem, every course
	// that is a prereq would count as an indegree. (Not to be
	// confused with "degree" as in "getting my computer science
	// degree".)
	const indegrees: number[] = Array(numCourses).fill(0);

	// Now we fill out our adjacency list graph and indegrees.
	for (const [course, prereq] of prerequisites) {
		graph[prereq].push(course);
		indegrees[course]++;
	}

	// Create an empty queue, then fill it with all nodes with
	// indegrees of 0. Or in other words, all courses with no
	// prereqs.
	const queue: number[] = [];
	for (let i = 0; i < numCourses; i++) {
		if (indegrees[i] === 0) queue.push(i);
	}

	while (queue.length) {
		// We start iterating through our queue by taking the first
		// node. We mutate numCourses to be equal to one less itself
		// to indicate that we've used up a course. We'll use this
		// to check if we're able to take all the courses later.
		// We could also use a count variable and check equivalence
		// to an unmutated numCourses, but this is a bit easier on
		// memory. You could also keep an array of visited nodes and
		// compare length to numCourses, but that's worse on memory
		// than either of the other ways.
		const course = queue.shift();
		numCourses--;

		// Check to see what new courses are enabled by taking this
		// course. Go through them and reduce their indegrees by
		// one, since taking this course is equivalent to removing
		// this node from the graph. If their indegrees is 0, they
		// no longer have prereqs and get added to our queue.
		for (const newCourse of graph[course]) {
			indegrees[newCourse]--;
			if (indegrees[newCourse] === 0) queue.push(newCourse);
		}
	}

	// Finally, numCourses should now be 0 if we were able to
	// take all of the courses we needed.
	return !numCourses;
};
```
