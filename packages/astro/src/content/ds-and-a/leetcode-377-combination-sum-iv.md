---
title: 377. Combination Sum IV
description: Given an array of distinct integers and a target integer, return the number of possible combinations that add up to target.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/combination-sum-iv/)

Given an array of **distinct** integers `nums` and a target integer `target`, return the _number of possible combinations that add up to_ `target`.

The test cases are generated so that the answer can fit in a **32-bit** integer.

<details>
<summary>Examples</summary>

Example 1:

```
Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
```

Example 2:

```
Input: nums = [9], target = 3
Output: 0
```
</details>

<details>
<summary>Constraints</summary>


- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- All the elements of `nums` are **unique**.
- `1 <= target <= 1000`

</details>

## My Solution

### Dynamic Programming - Bottom-up

Here we've got another problem solved with dynamic programming. We can break apart this problem into smaller sub-problems to get our solution.

In this first variation, we use the bottom-up approach. First, create our cache `dp` as an array with length of `target + 1`. We'll initialize `dp[0] = 1`, as there's exactly one combination to reach a target of zero (i.e., use no numbers). Next we loop over the range `0` to `target - 1`. If we have no value for `dp[i]`, we continue to the next number in the range. Since we initialized `dp[0]` to `1`, we'll at least run the rest of the loop that first time if `target > 0`.

Then for each number `i` in the range, we'll loop over each `num` in the `nums` array. If `num + i <= target`, then we've found a possibly valid path toward the target. So we'll set `dp[num + i]` equal to itself plus `dp[i]`. That is to say, we take the number of combinations we know gets us to `dp[i]` and add them to any other already known number of combinations that get us to `num + i`.

Once we've finished all our loops, the total number of valid combinations will be at index `target` in `dp`, so we return `dp[target]`. This is true even if the `target` is `0`, since we initialized `dp[0] = 1`.

```typescript
function combinationSum4(nums: number[], target: number): number {
	const dp = Array.from({length: target + 1}, () => 0);
	dp[0] = 1;

	for (let i = 0; i < target; i++) {
		if (!dp[i]) continue;
		for (const num of nums) {
			if (num + i <= target) {
				dp[i + num] += dp[i];
			}
		}
	}

	return dp[target];
};
```

The time complexity is $O(n * m)$, where $n$ is the `target` and $m$ is the length of `nums`. Space complexity is $O(n)$.

### Dynamic Programming - Top-down

The top-down approach is nearly identical to the bottom-up approach. Here we loop not from `0` through `target - 1`, but instead from `1` through `target`. We don't need to check if `dp[i]` exists here before running the inner loop, because we'll be setting values to `dp[i]` instead of `dp[num + i]`. Next we loop again over `num` of `nums`. If `num <= i` (i.e., there is some value less than `i` and greater than or equal to `0` that, added to `num`, gets us to target of `i`), we'll set `dp[i]` to itself plus the combinations we've observed at `dp[i - num]`. And again, we return `dp[target]`.

Just like with bottom-up, time complexity is $O(n * m)$, where $n$ is the `target` and $m$ is the length of `nums`. Space complexity is $O(n)$.

```typescript
function combinationSum4(nums: number[], target: number): number {
	const dp = Array.from({length: target + 1}, () => 0);
	dp[0] = 1;

	for (let i = 1; i <= target; i++) {
		for (const num of nums) {
			if (num <= i) {
				dp[i] += dp[i - num];
			}
		}
	}

	return dp[target];
};
```