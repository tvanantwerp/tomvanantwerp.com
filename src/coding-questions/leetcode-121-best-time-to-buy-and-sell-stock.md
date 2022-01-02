---
title: 121. Best Time to Buy and Sell Stock
description: You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.

Example 1:

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

Example 2:

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

Constraints:

- 1 <= `prices.length` <= 10<sup>5</sup>
- 0 <= `prices[i]` <= 10<sup>4</sup>



## My Solution

### Naive Attempt

First stab at an answer is naive. I knew when writing it that it wouldn't scale, but it's usually to get a poorly-done solution out first, then identify the weak points and fix it.

```javascript
const maxProfit = function(prices) {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    const bestFuturePrice = Math.max(...prices.slice(i + 1))
    if (bestFuturePrice - prices[i] > max) {
      max = bestFuturePrice - prices[i]
    }
  }
  return max;
};
```

The solution goes through each price, and then compares it to the highest _future_ price (i.e., the maximum of the remainder of the `prices` array). The function returns a variable `max`, which is updated every time that the future price minus the current price is greater than the previous maximum profit. This solution is bad because it's got $O(n{^2})$ time complexity. The larger the prices array, the worse this performs. The Leetcode platform times out if you submit this answer. Lets do better.

### Better Attempt

This solution does a single pass through the array, and thus only has a time complexity of $O(n)$. Instead of comparing each price against the maximum future price—which requires comparing all future prices to find the maxium—it simply checks whether each new price is the _minimum_ so far, and if not it compares the current price to the smallest value seen so far. If the difference between the current price and the current minimum is greater than the current value of `max`, update it.

```javascript
const maxProfit = function(prices) {
  let min = Infinity;
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else {
      max = Math.max(prices[i] - min, max);
    }
  }
  return max;
};
```