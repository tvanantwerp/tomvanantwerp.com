---
title: LeetCode 15. 3Sum
description: Given an integer array, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/3sum/)

Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

Example 2:

```
Input: nums = []
Output: []
```

Example 3:

```
Input: nums = [0]
Output: []
```
</details>

<details>
<summary>Constraints</summary>

- 0 <= `nums.length` <= 3000
-  -10<sup>5</sup> <= `nums[i]` <= 10<sup>5</sup>
</details>

## My Solution

This problem is tricky. Trickier than [Two Sum](/coding-questions/leetcode-001-two-sum), to be sure.

We can solve this problem in $O(n{^2} + n \log n)$ time, which reduces to just $O(n{^2})$. First we'll sort the input array, which costs us the $O(n \log n)$ time but greatly reduces the complexity of comparing values across the array.

With our array sorted, we'll iterate through it. For each number `nums[i]`, we'll designate a new index `j` and `k` representing the indices immediately right of `i` and at `nums.length - 1` respectively. Then with a `while` loop, we increment `j` to see if any sum of `nums[i] + nums[j] + nums[k]` equals our target. If we find the correct sum, we can push to an array containing our results and then increment `j` and decrement `k` to search for new possible solutions. Once all the combinations of `nums[i] + nums[j] + nums[k]` have been exhausted, finally the `for` loop increments `i` and we start again. This process gives us $O(n{^2})$ time complexity.

```javascript
const threeSum = (nums, target = 0) => {
	// Don't waste time doing anything if not enough values
	if (nums.length < 3) return [];

	// Sort nums to make traversal easier when dealing with
	// possible duplicates. Take O(N log(N)) time. Using a sort
	// function is key, or it will default to string comparison
	// which coulb be wrong.
	// DO NOT dedupe the array upfront, because you'll miss
	// correct combinations that include multiple instances of
	// the same number in the nums array.
	nums.sort((a, b) => a - b);
	const triplets = [];

	for (let i = 0; i < nums.length - 2; i++) {
		// Because we sorted nums, if nums[i] > target, we know we
		// cannot hit the target by continuing the loop.
		if (nums[i] > target) break;

		// To avoid duplicates in our triplets array, skip
		// duplicates of nums[i].
		if (i > 0 && nums[i] === nums[i - 1]) continue;

		// The variable j will represent an increasing index to the
		// immediate right of i. And k will represent a decreasing
		// index beginning at the end of the array.
		let j = i + 1;
		let k = nums.length - 1;

		// Think of i and k as anchored values, with j iterating
		// between them. Once j has gone through all of the space
		// between i and k, then k will decrement. Once k has
		// decremented all the way back such that
		// i === j - 1 === k - 2, i will increment and we repeat.
		while (j < k) {
			const sum = nums[i] + nums[j] + nums[k];

			if (sum === target) {
				// If we've got a target sum, push to results.
				triplets.push([nums[i], nums[j], nums[k]]);

				// To avoid adding duplicated, we reposition
				// j and k if their neighbors have the same value.
				while (nums[j] === nums[j + 1]) {
					j++;
				}
				while (nums[k] === nums[k - 1]) {
					k--;
				}

				// Now that we're sure we've skipped duplicates,
				// reposition j and k to begin a loop with fresh values.
				j++;
				k--;
			// Otherwise increment j until the sum is too great,
			// at which point we might as well stop incrementing
			// j because there's no way to hit the target sum
			// by continuing that loop.
			} else if (sum < target) {
				j++;
			// Finally, decrement k if j is exhausted.
			} else {
				k--;
			}
		}
	}

	return triplets;
};
```

Credit to [uplifted](https://leetcode.com/uplifted) for his example shared example [here](https://leetcode.com/problems/3sum/discuss/281302/JavaScript-with-lots-of-explanatory-comments!).