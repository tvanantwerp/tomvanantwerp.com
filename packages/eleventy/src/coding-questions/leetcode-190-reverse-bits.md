---
title: 190. Reverse Bits
description: Reverse bits of a given 32 bits unsigned integer.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/reverse-bits/)

Reverse bits of a given 32 bits unsigned integer.

**Follow up**: If this function is called many times, how would you optimize it?

<details>
<summary>Examples</summary>
Example 1:
```
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
```

Example 2:
```
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
```
</details>

<details>
<summary>Constraints</summary>

The input must be a **binary string** of length `32`
</details>

## My Solution

### Naïve Approach

If you choose to ignore that this is a problem about binary operations, you can very simply return the integer representing the reverse of the input's bits by converting to a string, splitting it, reversing the array, joining it, padding any necessary zeroes back on, then finally making it an integer again.

```javascript
const reverseBits = n => {
  return Number.parseInt(
    n
      .toString(2)
      .split("")
      .reverse()
      .join("")
      .padEnd(32, "0"),
    2
  );
};
```

Of course, we know that we really ought to use binary operations because...well, it's a question about bits, isn't it?

### Better Bitwise Approach

A more appropriate approach is to loop 32 times (because 32-bit int) and fill in a result variable with the results of shifting the binary number in each step.

```javascript
const reverseBits = n => {
  let result = 0;
  for (let i = 0; i < 32; i++) {
      // We're going to add to the result whatever is the ith
      // bit from the right of n. So we shift right 0 times,
      // then once, then twice, until we've shifted right 32
      // times. By using AND to compare that bit to 1, we can
      // add either 1 or 0 to result as appropriate.
      result += ((n >>> i) & 1);
      // Don't shift on the final loop!
      if (i < 31) {
          result <<= 1;
      }
  }
  // This is particular to JavaScript. When we were shifting
  // left (<<) above, JS coerced the result to a signed int!
  // By right-shifting 0 places, we can coerce it back to an
  // unsigned integer. You could also use Math.abs() on the
  // result. Or in the loop, instead of left-shifting, you
  // could multiply the result by 2 for the same effect.
  return result >>>= 0;
};
```

This is a perfectly good way to get the reversed binary value with bitwise operators. Having $O(32)$ isn't too shabby! But is there an even simpler way? Uh, yeah, sort of.

### Next-Level Bitwise Approach

```javascript
const reverseBits = n => {
    let result = n;
    result = result >>> 16 | result << 16;
    result = (result & 0xff00ff00) >>> 8 | (result & 0x00ff00ff) << 8;
    result = (result & 0xf0f0f0f0) >>> 4 | (result & 0x0f0f0f0f) << 4;
    result = (result & 0xcccccccc) >>> 2 | (result & 0x33333333) << 2;
    result = (result & 0xaaaaaaaa) >>> 1 | (result & 0x55555555) << 1;
    // Don't forget to coerce to unsigned int for JavaScript!
    return result >>> 0;
};
```

_Um, what?_

Yeah, this one will probably need explaining. We start by setting the result equal to n. Then the first step is easy enough to understand: we're basically cutting the number `n` in half, and swapping those halves.

Here's an example of what's happening using letters to represent the unique binary digits and show how they are moving.

```
n = abcdefghijklmnopqrstuvwxyzABCDEF
n >>> 16 = 0000000000000000abcdefghijklmnop
n << 16 = qrstuvwxyzABCDEF0000000000000000
n >>> 16 | n << 16 = qrstuvwxyzABCDEFabcdefghijklmnop
```

But what's with these hexidecimal numbers in the next steps? Well, we're sort of doing the same thing, but now we're breaking our halves into halves and swapping them. You can think of a number like `0xff00ff00` as the binary `11111111000000001111111100000000`. In each step, the hexidecimal numbers represent the `1`s that we're trying to intersect with an isolate to perform our shifts correctly.[^1]

```
result = qrstuvwxyzABCDEFabcdefghijklmnop
(n & 0xff00ff00) = qrstuvwx00000000abcdefgh00000000
(n & 0x00ff00ff) = 00000000yzABCDEF00000000ijklmnop
(n & 0xff00ff00) >>> 8 = 00000000qrstuvwx00000000abcdefgh
(n & 0x00ff00ff) << 8 = yzABCDEF00000000ijklmnop00000000
(n & 0xff00ff00) >>> 8 | (n & 0x00ff00ff) << 8 = yzABCDEFqrstuvwxijklmnopabcdefgh
```

With each step, we break the previously shifted sections in half and shift them. Here's how each step transforms the result, color coded to make it easier to see the pattern:[^2]

<p style="font-family: var(--mono)">
  <span style="color: var(--blue-highlight)">abcdefghijklmnop</span><span style="color: var(--red-highlight)">qrstuvwxyzABCDEF</span> to <span style="color: var(--red-highlight)">qrstuvwxyzABCDEF</span><span style="color: var(--blue-highlight)">abcdefghijklmnop</span>
</p>
<p style="font-family: var(--mono)">
  <span style="color: var(--blue-highlight)">qrstuvwx</span><span style="color: var(--red-highlight)">yzABCDEF</span><span style="color: var(--blue-highlight)">abcdefgh</span><span style="color: var(--red-highlight)">ijklmnop</span> to <span style="color: var(--red-highlight)">yzABCDEF</span><span style="color: var(--blue-highlight)">qrstuvwx</span><span style="color: var(--red-highlight)">ijklmnop</span><span style="color: var(--blue-highlight)">abcdefgh</span>
</p>
<p style="font-family: var(--mono)">
  <span style="color: var(--blue-highlight)">yzAB</span><span style="color: var(--red-highlight)">CDEF</span><span style="color: var(--blue-highlight)">qrst</span><span style="color: var(--red-highlight)">uvwx</span><span style="color: var(--blue-highlight)">ijkl</span><span style="color: var(--red-highlight)">mnop</span><span style="color: var(--blue-highlight)">abcd</span><span style="color: var(--red-highlight)">efgh</span> to <span style="color: var(--red-highlight)">CDEF</span><span style="color: var(--blue-highlight)">yzAB</span><span style="color: var(--red-highlight)">uvwx</span><span style="color: var(--blue-highlight)">qrst</span><span style="color: var(--red-highlight)">mnop</span><span style="color: var(--blue-highlight)">ijkl</span><span style="color: var(--red-highlight)">efgh</span><span style="color: var(--blue-highlight)">abcd</span>
</p>
<p style="font-family: var(--mono)">
  <span style="color: var(--red-highlight)">CD</span><span style="color: var(--blue-highlight)">EF</span><span style="color: var(--red-highlight)">yz</span><span style="color: var(--blue-highlight)">ab</span><span style="color: var(--red-highlight)">uv</span><span style="color: var(--blue-highlight)">wx</span><span style="color: var(--red-highlight)">qr</span><span style="color: var(--blue-highlight)">st</span><span style="color: var(--red-highlight)">mn</span><span style="color: var(--blue-highlight)">op</span><span style="color: var(--red-highlight)">ij</span><span style="color: var(--blue-highlight)">kl</span><span style="color: var(--red-highlight)">ef</span><span style="color: var(--blue-highlight)">gh</span><span style="color: var(--red-highlight)">ab</span><span style="color: var(--blue-highlight)">cd</span> to <span style="color: var(--blue-highlight)">EF</span><span style="color: var(--red-highlight)">CD</span><span style="color: var(--blue-highlight)">ab</span><span style="color: var(--red-highlight)">yz</span><span style="color: var(--blue-highlight)">wx</span><span style="color: var(--red-highlight)">uv</span><span style="color: var(--blue-highlight)">st</span><span style="color: var(--red-highlight)">qr</span><span style="color: var(--blue-highlight)">op</span><span style="color: var(--red-highlight)">mn</span><span style="color: var(--blue-highlight)">kl</span><span style="color: var(--red-highlight)">ij</span><span style="color: var(--blue-highlight)">gh</span><span style="color: var(--red-highlight)">ef</span><span style="color: var(--blue-highlight)">cd</span><span style="color: var(--red-highlight)">ab</span>
</p>
<p style="font-family: var(--mono)">
  <span style="color: var(--blue-highlight)">E</span><span style="color: var(--red-highlight)">F</span><span style="color: var(--blue-highlight)">C</span><span style="color: var(--red-highlight)">D</span><span style="color: var(--blue-highlight)">a</span><span style="color: var(--red-highlight)">b</span><span style="color: var(--blue-highlight)">y</span><span style="color: var(--red-highlight)">z</span><span style="color: var(--blue-highlight)">w</span><span style="color: var(--red-highlight)">x</span><span style="color: var(--blue-highlight)">u</span><span style="color: var(--red-highlight)">v</span><span style="color: var(--blue-highlight)">s</span><span style="color: var(--red-highlight)">t</span><span style="color: var(--blue-highlight)">q</span><span style="color: var(--red-highlight)">r</span><span style="color: var(--blue-highlight)">o</span><span style="color: var(--red-highlight)">p</span><span style="color: var(--blue-highlight)">m</span><span style="color: var(--red-highlight)">n</span><span style="color: var(--blue-highlight)">k</span><span style="color: var(--red-highlight)">l</span><span style="color: var(--blue-highlight)">i</span><span style="color: var(--red-highlight)">j</span><span style="color: var(--blue-highlight)">g</span><span style="color: var(--red-highlight)">h</span><span style="color: var(--blue-highlight)">e</span><span style="color: var(--red-highlight)">f</span><span style="color: var(--blue-highlight)">c</span><span style="color: var(--red-highlight)">d</span><span style="color: var(--blue-highlight)">a</span><span style="color: var(--red-highlight)">b</span> to <span style="color: var(--red-highlight)">F</span><span style="color: var(--blue-highlight)">E</span><span style="color: var(--red-highlight)">D</span><span style="color: var(--blue-highlight)">C</span><span style="color: var(--red-highlight)">b</span><span style="color: var(--blue-highlight)">a</span><span style="color: var(--red-highlight)">z</span><span style="color: var(--blue-highlight)">y</span><span style="color: var(--red-highlight)">x</span><span style="color: var(--blue-highlight)">w</span><span style="color: var(--red-highlight)">v</span><span style="color: var(--blue-highlight)">u</span><span style="color: var(--red-highlight)">t</span><span style="color: var(--blue-highlight)">s</span><span style="color: var(--red-highlight)">r</span><span style="color: var(--blue-highlight)">q</span><span style="color: var(--red-highlight)">p</span><span style="color: var(--blue-highlight)">o</span><span style="color: var(--red-highlight)">n</span><span style="color: var(--blue-highlight)">m</span><span style="color: var(--red-highlight)">l</span><span style="color: var(--blue-highlight)">k</span><span style="color: var(--red-highlight)">j</span><span style="color: var(--blue-highlight)">i</span><span style="color: var(--red-highlight)">h</span><span style="color: var(--blue-highlight)">g</span><span style="color: var(--red-highlight)">f</span><span style="color: var(--blue-highlight)">e</span><span style="color: var(--red-highlight)">d</span><span style="color: var(--blue-highlight)">c</span><span style="color: var(--red-highlight)">b</span><span style="color: var(--blue-highlight)">a</span>
  </p>
</p>

We've reduced our already amazing $O(32)$ to $O(1)$! This is much better optimized if you've got an absolute ton of binary numbers to reverse, though it's perhaps not the most intuitive or legible.

[^1]: For simpicity's sake, the hexidecimal numbers are omitted from the first shift because they are not strictly necessary there. But if you want to be a completionist, then `n >>> 16` is equivalent to `(n & 0xffff0000) >>> 16`, and `n << 16` is equivalent to `(n & 0x0000ffff) << 16`.

[^2]: I hand-coded the HTML to highlight those shifts like a moron, so I hope you appreciate it!