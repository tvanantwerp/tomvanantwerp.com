---
title: 322. Coin Change
description: You are given coins of different denominations and a total amount of money. Return the fewest number of coins that you need to make up that amount.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/coin-change/)

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return _the fewest number of coins that you need to make up that amount_. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

<details>
<summary>Examples</summary>

Example 1:

```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

Example 2:

```
Input: coins = [2], amount = 3
Output: -1
```

Example 3:

```
Input: coins = [1], amount = 0
Output: 0
```
</details>

<details>
<summary>Constraints</summary>


- 1 ≤ `coins.length` ≤ 12
- 1 ≤ `coins[i]` ≤ 2<sup>31 - 1</sup>
- 0 ≤ `amount` ≤ 10<sup>4</sup>
</details>

## My Solution

### Naïve Attempt

The first idea is to see if you can greedily build up to the amount using whatever the largest coins are, working your way down to smaller denominations of coin as necessary.

However, this approach won't work. By focusing on the largest coins first and filling in with whatever smaller coins work toward the end, you can miss solutions with middle values that ultimately use fewer coins. For example:

```
coins = [1, 4, 5, 7]
amount = 9

greedy approach answer
7 + 1 + 1 = 9 => 3 coins

correct answer
4 + 5 = 9 => 2 coins
```

We'll need a more sophisticated algorithm.

### Depth-First Search (Top-Down)



### Bottom-Up Dynamic Programming

```typescript
const coinChange = (coins: number[], amount: number): number => {
	// Go ahead and return when there's no need to calculate
	if (amount === 0) return 0;
	if (amount < Math.min(...coins)) return -1;

	// Initialize an array of length amount + 1, and fill
	// with Infinity to be sure the initial values are
	// sufficiently large for comparison later. Really, you
	// could suffice with amount + 1, but I prefer Infinity
	// because it's more obvious that what we want is a large
	// number that we'll never actually hit.
	const dp: number[] = Array(amount + 1).fill(Infinity);
	// dp[0] implies the smallest count of coins when amount
	// is zero, which would of course be zero.
	dp[0] = 0;

	for (const coin of coins) {
		for (let i = coin; i <= amount; i++) {
			// Recurrence relation: the expression of the next
			// value in a sequence in terms of the previous
			// values in the sequence.
			dp[i] = Math.min(dp[i], dp[i - coin] + 1)
		}
	}

	// If dp[amount] is greater than the amount itself
	// (i.e., Infintiy), then return -1.
	// Else, return dp[amount].
	return dp[amount] > amount ? -1 : dp[amount]
};
```