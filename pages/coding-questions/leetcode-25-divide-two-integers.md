# 25. Divide Two Integers

## The Problem

[Link to original problem on Leetcode](https://leetcode.com/problems/divide-two-integers/)

Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2<sup>31</sup>,&nbsp;2<sup>31</sup>&nbsp;−&nbsp;1]. For this problem, assume that your function returns 2<sup>31</sup>&nbsp;−&nbsp;1 when the division result overflows.

**Example 1**:
```
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.
```

**Example 2**:
```
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.
```

**Example 3**:
```
Input: dividend = 0, divisor = 1
Output: 0
```

**Example 4**:
```
Input: dividend = 1, divisor = 1
Output: 1
```

Constraints:
* -2<sup>31</sup> <= dividend, divisor <= 2<sup>31</sup> - 1
* divisor != 0

## My Solution

My first pass at this problem was to simply count how many times I could subtract the absolute value of the divisor from the dividend before reaching 0, then returning that count with the appropriate sign.

```javascript
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const divide = function(dividend, divisor) {
    let top = Math.abs(dividend);
    const bottom = Math.abs(divisor);

    const positiveDividend = (dividend === top);
    const positiveDivisor = (divisor === bottom);

    let result = 0;

    while (top - bottom >= 0) {
        result++;
        top -= bottom;
    }
    if (positiveDividend !== positiveDivisor) {
        const subAmt = result + result;
        console.log
        result -= subAmt;
    }

    switch(true) {
        case result < -1 * 2**31:
            return -1 * 2**31;
        case result > 2**31 - 1:
            return 2**31 - 1;
        default:
            return result;
    }
};
```

While this works, it's not efficient. For example, if the dividend is large and the divisor small, this function takes a very long time to execute. Certainly long enough for leetcode to refuse to compute such a case!

Since my hands are tied regarding ordinary multiplication, division, and modulo, my next idea was to conert to binary and do arithmetic there.