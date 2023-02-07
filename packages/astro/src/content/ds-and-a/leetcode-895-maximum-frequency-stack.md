---
title: 895. Maximum Frequency Stack
description: Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.
---

## The Problem

[Link to original problem on Leetcode.](https://leetcode.com/problems/maximum-frequency-stack/)

Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the `FreqStack` class:

- `FreqStack()` constructs an empty frequency stack.
- `void push(int val)` pushes an integer `val` onto the top of the stack.
- `int pop()` removes and returns the most frequent element in the stack.
  - If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.


<details>
<summary>Examples</summary>

Example 1:

```
Input
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output
[null, null, null, null, null, null, null, 5, 7, 5, 4]

Explanation
FreqStack freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].
```
</details>

<details>
<summary>Constraints</summary>

- 0 ≤ val ≤ 10<sup>9</sup>
- At most 2 * 10<sup>4</sup> calls will be made to `push` and `pop`.
- It is guaranteed that there will be at least one element in the stack before calling `pop`.
</details>

## My Solution

To solve this problem, we'll need two data structures within our class: a map to keep track of the frequencies of numbers, and an array of stacks to keep track of insertion order.

The map is easy enough to understand: for any number `x` used as a map key, the value paired to that key will equal the number of times `x` occurs in the stack at present.

The stacks array is a little trickier to understand. Instead of using one stack to track insertion order, we use the indices of an outer array to track frequencies and an array at each index that serves as a stack to track insertion order. For example, if I `push` the number `3` to our `FreqStack` and it's already in there `4` times, our new frequency of `3` is `5`. So we check to see if there is an array at the index `5` in our stack. If so, we push `3` onto it. The array at index `5` reflects the insertion order of numbers with a frequency of `5`. If there isn't an array at index `5` already, we create a new one: `[3]`.

When we pop, we first find the highest frequency numbers by looking at the last index of our stacks array. And when we pop from the stack at the highest available index in our array of stacks, we will get the number to return. Then we decrement the frequency of that number in our map and remove the stack from our array _if_ the stack is now empty. Finally, we return the value.

```typescript
class FreqStack {
    frequencies: Map<number, number>;
    stacks: number[][]
    constructor() {
        this.frequencies = new Map();
        this.stack = [];
    }

    push(val: number): void {
        // Including this invocation, what is the current
        // frequency of the pushed value? Update it!
        const frequency = (this.frequencies.get(val) || 0) + 1;
        this.frequencies.set(val, frequency);
        // If this frequency exists in our stacks, push this
        // value to the end of the stack at that frequency
        // index. Otherwise, create a stack at that index.
        this.stacks[frequency]
            ? this.stacks[frequency].push(val)
            : this.stacks[frequency] = [val];
    }

    pop(): number {
        // Find the stack of most frequent values, and then
        // pop from that stack to get the most recently value.
        const top = this.stacks.at(-1), value = top.pop();
        // If you've emptied the stack at this frequency, remove
        // it from the array of stacks.
        if (!top.length) this.stacks.pop();
        // Update the frequency of the value to return in our
        // frequencies map.
        this.frequencies.set(value, this.frequencies.get(value) - 1);

        return value;
    }
}
```

Thanks to [sgallivan](https://leetcode.com/sgallivan) for [sharing the solutions](https://leetcode.com/problems/maximum-frequency-stack/discuss/1086543/JS-Python-Java-C%2B%2B-or-Frequency-Map-and-Stack-Solution-w-Explanation) this one is inspired by.