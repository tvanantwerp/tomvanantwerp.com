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

### Breadth First Search Topological Sort

A [topological sort](https://en.wikipedia.org/wiki/Topological_sorting) is to take the nodes of a directed graph and list the out in a valid traversal order. In the context of our problem, that means ordering the classes to be taken in a valid order, such that prerequisites must come before the classes that require them.

To do this, we'll use a breadth first search. To do this, we'll create a graph of all prerequisites and the classes that they enable. Then we'll queue up all courses that have no prerequisites, and start iterating over each of them to see what new courses are enabled by taking them. Any time a new course is enabled by taking all of its prerequisites, it's effectively a zero prerequisite course and can be added to the queue. This is a breadth first search because we're just adding new nodes to the queue to be traverse after other already identified nodes, rather than trying to traverse them immediately for as far as we can.

If it's possible to take every course, then the length of the topological sort should equal `numCourses`. Since we don't actually need to know the order, we'll just keep track of that length by mutating `numCourses` to decrement by one with each successfully taken course, and check if `numCourses` equals `0` at the end of the algorithm's execution and return `true` if so. If it's not possible to take all courses—which is to say, the graph is not acyclic—then `numCourses` will not equal `0` and the function returns `false`.

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

### Depth First Search with Recursion

With a depth first search, we're going to define a function to call recursively on the neighbors of each node we find ourselves at during traversal. We'll detect potential cycles (in context, impossible to satisfy prerequisite requirements) by keeping track of which nodes we've visited within the current depth first search, and returning false if we end up back at a previous node. If all nodes in the search check out, we use a different visited mark to indicate that the node and all neighbors were verified as part of a directed acyclic graph, and go ahead and skip it.

```typescript
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	// First we initialize our graph and an array to track nodes
	// we've visited already.
	const graph: number[][] = Array.from({length: numCourses}, () => []);
	const visited: number[] = Array(numCourses).fill(0);

	// Next populate our graph with the prerequisites
	// of each course.
	for (const [course, prereq] of prerequisites) {
		graph[course].push(prereq);
	}

	// Now use the depth first search function we defined below
	// to make sure every node in the graph is traversed.
	for (let i = 0; i < numCourses; i++) {
		if (!dfs(i, graph, visited)) return false;
	}

	// No cycles found, so we should be able to take all courses.
	// Return true and get your diploma!
	return true;
};

// We define the function dfs to handle our search.
// This function will keep track of what nodes we have
// visited by updating values in the visited array.
// If visited[i] === -1, we visited it already and we've
// got a cycle in the graph, so return false. If it's
// equal to 1, we've not only visited this node, but all
// of its neighbors too, and not encountered problems.
// You could also define this function within canFinish if
// you don't want to have to pass graph and visited.
function dfs(i: number, graph: number[][], visited: number[]) {
	// A visited node (-1) means we found a cycle. Return false.
	if (visited[i] === -1) return false;
	// A fully traversed node (1) is fine, return true.
	if (visited[i] === 1) return true;

	// Temporarily set this node to having been visited.
	visited[i] = -1;
	// Recursively call dfs on all of the neighboring nodes,
	// the prerequisites.
	for (const prereq of graph[i]) {
		// If the recursive call returns false,
		// so should this level.
		if (!dfs(prereq, graph, visited)) return false;
	}

	// If we visited the node and all of its neighbors
	// through recursive calls to dfs, and no cycle was
	// found, then change visited[i] to 1 to symbolize
	// that this node and its neighbors checked out fine.
	visited[i] = 1;

	return true;
}
```

## Some JavaScript Trivia

You may notice that the graph was created with `Array.from({length: numCourses}, () => [])` while the `indegrees` variable used the shorter `Array(numCourses).fill(0)`. Why couldn't we use the short version for the graph, too? Wouldn't `Array(numCourses).fill([])` be more elegant?

Well, yes, but it would also not work.

`Array.fill` fills an array with the _exact_ thing you give to it. So in the case of a number, it will use the literal value of that number. But for an object (and an empty array counts as an object), it fills with the _reference_ to that object. So instead of filling with _n_ unique empty arrays, you would get _n_ references to the exact same empty array! So any time you tried `graph[prereq].push(course)`, every single array in the larger array would receive that value.

So, instead of...

```typescript
const graph = Array.from({length: 3}, () => []);
// graph === [[], [], []]
graph[1].push(5)
// graph === [[], [5], []]
```

...you would end up with...

```typescript
const graph = Array(3).fill([]);
// graph === [[], [], []]
graph[1].push(5)
// graph === [[5], [5], [5]]
```

...which is not what we want at all!