---
title: 008. String to Interger (atoi)
description: Implement `atoi` which converts a string to an integer.
tags:
  - Coding Questions
layout: codingQuestions
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/string-to-integer-atoi/)

Implement `atoi` which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

**Note**

*  Only the space character `' '` is considered a whitespace character.
*  Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [-2<sup>31</sup>,&nbsp;2<sup>31</sup>&nbsp;−&nbsp;1]. If the numerical value is out of the range of representable values, 2<sup>31</sup>&nbsp;−&nbsp;1 or −2<sup>31</sup> is returned.

**Example 1**:
```
Input: str = "42"
Output: 42
```

**Example 2**:
```
Input: str = "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign. Then take as many numerical digits as possible, which gets 42.
```

**Example 3**:
```
Input: str = "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
```

**Example 4**:
```
Input: str = "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical digit or a +/- sign. Therefore no valid conversion could be performed.
```

**Example 5**:
```
Input: str = "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer. Thefore INT_MIN (−231) is returned.
```

## My Solution

I created a regular expression to match strings that start with an optional sign and then a number. I used JavaScript's `trimLeft` string method to get rid of any leading white space, then matched the input against my regex. If there's a match, then I run my match through a switch statement to enforce the 32-bit integer bounds for the return value.

```javascript
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    const pattern = /^([\+\-]?[0-9]+)/;
    const result = str.trimLeft().match(pattern);

    if (result) {
        switch(true) {
            case +result[1] < -1 * 2**31:
                return -1 * 2**31;
            case +result[1] > 2**31-1:
                return 2**31-1;
            default:
                return +result[1];
        }
    } else {
        return 0;
    }
};
```

If I hadn't used regex, I could've instead iterated through the input string and checked one character at a time for appropriate matches. But that sounds painful and I know regex so here we are.
