---
title: First Recurring Character
description: Given an array, return the first character to occur twice. Else, return undefined.
---

## The Problem

[Link to original problem on Leetcode.](https://repl.it/@aneagoie/firstRecurringCharacter-exercise)

Given an array, return the first character to occur twice. Else, return undefined.

Given an `array = [2,5,1,2,3,5,1,2,4]`:
It should return `2`

Given an `array = [2,1,1,2,3,5,1,2,4]`:
It should return `1`

Given an `array = [2,3,4,5]`:
It should return `undefined`

## My Solution

Using JavaScript, this is an easy one to solve with a `Map` or just using an `Object` as hash table. Time and space complexity is $$O(n)$$.

```javascript
// Version with Map
function firstRecurringCharacter(input) {
	const map = new Map();
	for (let i = 0; i < input.length; i++) {
		if (map.has(input[i])) {
			return input[i];
		} else {
			map.set(input[i], i);
		}
	}

	return undefined;
}
```

```javascript
// Version with Object
function firstRecurringCharacter(input) {
	const map = {};
	for (let i = 0; i < input.length; i++) {
		// Have to specify !== undefined, because
		// { input[i]: i} where i === 0 would evaluate
		// to falsey, giving us a wrong answer.
		if (map[input[i]] !== undefined) {
			return input[i];
		} else {
			map[input[i]] = i;
		}
	}

	return undefined;
}
```
