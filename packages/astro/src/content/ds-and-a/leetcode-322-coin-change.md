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

### Wrong Naïve Attempt

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

### Recursive Depth-First Search (Top-Down)

One approach is to use a recusive depth-first search with memoization. The memoization is important, because we're sure to repeat a lot of calculations otherwise. (E.g., if one of the coins is `1`, then we're sure to reach many possible solutions where we're calculating a remaining amount of `1` minus a coin of value `1`. No reason doing that more than once!)

Time complexity is $$O(n * amount)$$, where $$n$$ is the length of `coins`. Space complexity is $$O(amount)$$.

```typescript
const coinChange = (
	coins: number[],
	amount: number,
	memo = new Map(),
): number => {
	// Go ahead and return when there's no need to calculate
	if (amount === 0) return 0;
	if (amount < Math.min(...coins)) return -1;
	if (memo.has(amount)) return memo.get(amount);

	// Initialize the minimum coins used to
	// an impossibly high value
	let minCoinsUsed = Infinity;

	// For each coin, we'll recursively call this function
	// with the amount minus the coin value. This will go through
	// all possible paths to an outcome.
	for (const coin of coins) {
		const c = coinChange(coins, amount - coin, memo);
		// Assuming we didn't get -1 returned (e.g., this path
		// won't work), then go ahead and update the minimum
		// number of coins used.
		if (c !== -1) minCoinsUsed = Math.min(c + 1, minCoinsUsed);
		// Why add one? Imagine a coin of 1 and an amount of 1.
		// We'd end up calling coinChange([1], 0), which would
		// return 0. But we did use a single 1 coin, not 0 coins!
		// So we add 1 to fix that.
	}

	// We're supposed to return -1 for failures, so if our
	// minCoinsUsed isn't less than Infinity, return -1 instead.
	// Then update our memoization and return minCoinsUsed.
	minCoinsUsed = minCoinsUsed < Infinity ? minCoinsUsed : -1;
	memo.set(amount, minCoinsUsed);
	return minCoinsUsed;
};
```

### Iterative Dynamic Programming (Bottom-Up)

Much like a fibonacci sequence, we can express the coins required to sum up to a given amount as the sum of previously computed coin amounts. We'll keep track of these sums in an array named `dp`, short for **dynamic programming**.

While our previous DFS algorithm starts at the final amount and recurses to smaller and smaller calculations, this does the opposite. The dynamic programming approach is bottom-up, calculating from `amount = 0` and building up to the actual `amount`.

Time complexity is $$O(n * amount)$$, where $$n$$ is the length of `coins`. Space complexity is $$O(amount)$$.

```typescript
const coinChange = (coins: number[], amount: number): number => {
	// Go ahead and return when there's no need to calculate
	if (amount === 0) return 0;
	if (amount < Math.min(...coins)) return -1;

	// Initialize an array of length amount + 1, and fill
	// with Infinity to be sure the initial values are
	// sufficiently large for comparison later. Really, you
	// could suffice with values of amount + 1, but I prefer
	// Infinity  because it's more obvious that what we want is a
	// large number that we'll never actually hit. You could also
	// use Number.MAX_SAFE_INTEGER.
	const dp: number[] = Array(amount + 1).fill(Infinity);
	// dp[0] implies the smallest count of coins when amount
	// is zero, which would of course be zero.
	dp[0] = 0;

	for (const coin of coins) {
		for (let i = coin; i <= amount; i++) {
			// Recurrence relation: the expression of the next
			// value in a sequence in terms of the previous
			// values in the sequence.
			dp[i] = Math.min(dp[i], dp[i - coin] + 1);
			// We add 1 to dp[i - coin] because when i === coin,
			// we would get back 0. But we haven't used 0 coins,
			// so we add 1 to fix that.
		}
	}

	// If dp[amount] is greater than the amount itself
	// (i.e., Infintiy), then return -1.
	// Else, return dp[amount].
	return dp[amount] > amount ? -1 : dp[amount];
};
```
