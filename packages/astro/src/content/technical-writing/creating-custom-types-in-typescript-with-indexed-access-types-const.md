---
title: Creating Custom Types in TypeScript with Indexed Access Types, Const Assertions, and Satisfies
date: 2023-04-19
description: In this post, we'll cover how to create new types from existing types and data in TypeScript.
canonical: https://labs.thisdot.co/blog/creating-custom-types-in-typescript-with-indexed-access-types-const/
use_canonical_url: true
tags:
  - Technical Writing
  - TypeScript
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/creating-custom-types-in-typescript-with-indexed-access-types-const/)._

Frequently when writing TypeScript, you may need to create a new type from an existing type. For example, you may have a large type that you need to use in multiple places, and you want to create a new type that is a subset of the original type. Or you may have a large object full of data that you want to use to create types to maintain type safety. In this post, we'll cover how to create new types from existing types and data in TypeScript.

## Accessing parts of a type with indexed access types

In JavaScript, you can access an object property's value with the string key of that property using `someObject['someProperty']`. You can use the same sort of syntax with TypeScript's types to get specific pieces out of a type.

For example:

```ts
type Pizza = {
	diameter: number;
	crust: 'thin' | 'thick' | 'stuffed';
	sauce: 'red' | 'white';
	toppings: Array<
		'pineapple' | 'pepperoni' | 'anchovy' | 'peppers' | 'olives' | 'mushrooms'
	>;
	customer: string;
};

type Diameter = Pizza['diameter'];
// type Diameter = number

type Toppings = Pizza['toppings'];
// type Toppings = Array<'pineapple' | 'pepperoni' | 'anchovy' | 'peppers' | 'olives' | 'mushrooms'>
```

Using `TypeName["someProperty"]` allows you to extract that piece of the type. These are called indexed access types. If you needed to use a piece of a large, complex type, you could simply pull that piece out into its own type using indexed access types.

### Why indexed access types?

But what good is this? Couldn't I just refactor? In the previous example, wouldn't it be better for the pizza's `Toppings` to be a type of its own before defining `Pizza`, and then passed in as `toppings: Toppings`? I'd say yes, it would be. (And we'll cover that later!) But what if you're working with a type that you don't have control over (e.g., from a third party library), but you need to use a piece of it in a different type? That's where indexed access types come in.

### Why not just use `Pick`?

Wait, why not just use `Pick<SomeBigType, 'property'>` instead of indexed access types? You would want to use the indexed access type when you want _specifically_ a piece of the type, and not a type with that single property. For example:

```ts
type Pizza = {
	diameter: number;
	crust: 'thin' | 'thick' | 'stuffed';
	sauce: 'red' | 'white';
	toppings: Array<
		'pineapple' | 'pepperoni' | 'anchovy' | 'peppers' | 'olives' | 'mushrooms'
	>;
	customer: string;
};

type Toppings1 = Pick<Pizza, 'toppings'>;
// type Toppings1 = {
//   toppings: Array<'pineapple' | 'pepperoni' | 'anchovy' | 'peppers' | 'olives' | 'mushrooms'>;
// }

type Toppings2 = Pizza['toppings'];
// type Toppings2 = Array<'pineapple' | 'pepperoni' | 'anchovy' | 'peppers' | 'olives' | 'mushrooms'>;
```

### The index is a type!

It isn't obvious from looking at the examples, but when you index a type, you're doing so with another type! So if I wanted to access a piece of a type with a defined string, it would fail. For example:

```ts
const key = 'toppings';
type Toppings = Pizza[key];
// This fails with the following message:
// Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
```

In this case, I would instead have to use `Pizza[typeof key]` to get the same result as I would from just passing the value directly as `Pizza["toppings"]`. Alternatively, changing `const key` into `type key` would work.

Because the index is a type, you can pass a type in as the index. This lets me do things like tell TypeScript: "I want to create a type that could be any one of the items in this array". You would do this by using the type `number` as your index access type. For example, if I wanted to create a single `Topping` type from our `Pizza` example, I could do the following:

```ts
type Topping = Pizza['toppings'][number];
// type Topping = 'pineapple' | 'pepperoni' | 'anchovy' | 'peppers' | 'olives' | 'mushrooms';
```

## Creating types with const assertions

Sometimes in TypeScript, you'll have some object full of data that you would like to use in a type-safe way. Let's return to our pizza example. Say we're building a web app to let people order our pizzas. Inside our order form, we have a list of toppings. This list of data could include a name, a description, and an extra price.

```ts
const TOPPINGS = [
	{
		name: 'pineapple',
		description: 'A delicious tropical fruit',
		price: 0.5,
	},
	{
		name: 'pepperoni',
		description: 'A spicy meat topping',
		price: 0.75,
	},
	{
		name: 'anchovy',
		description: 'A salty fish topping',
		price: 1.0,
	},
	{
		name: 'peppers',
		description: 'A colorful vegetable topping',
		price: 0.5,
	},
	{
		name: 'olives',
		description: 'A salty vegetable topping',
		price: 0.75,
	},
	{
		name: 'mushrooms',
		description: 'A savory vegetable topping',
		price: 0.5,
	},
];
```

Since we've gone through the trouble of writing all of this out, we should use this data to inform the `Pizza` type about our toppings. If we don't, it's both a duplication of code (a time-waster) and an opportunity for this data to get out of sync with our `Pizza` type.

For a first attempt, you might use the indexed access types we learned about earlier to get each of the topping names:

```ts
type Topping = (typeof TOPPINGS)[number]['name'];
// type Topping = string;
```

But that won't work! TypeScript has widened the type from those literal values to the broader `string` type. It doesn't assume that these values can't be changed later on. But it did notice that every `name` in `TOPPINGS` was a string, so it decided that the `string` type was the safest bet. Here, you can see how it would widely interpret the type of any entry in `TOPPINGS`:

```ts
type Toppings = (typeof TOPPINGS)[number];
// type Topping1 = {
//   name: string;
//   description: string;
//   price: number;
// }[]
```

This is a good default, but it's not what we want here.

The fix to this problem is easy: const assertions. We can simply append `as const` at the end of our `TOPPINGS` declaration. This tells TypeScript that we want to treat everything about this object as literal values that should not be widened. For example:

```ts
const TOPPINGS = [
	{
		name: 'pineapple',
		description: 'A delicious tropical fruit',
		price: 0.5,
	},
	{
		name: 'pepperoni',
		description: 'A spicy meat topping',
		price: 0.75,
	},
	// ...
] as const;
// ^ THIS is the important part

type Toppings = (typeof TOPPINGS)[number];
// type Toppings = [
//   {
// 	readonly name: "pineapple";
// 	readonly description: "A delicious tropical fruit";
// 	readonly price: 0.5;
// } | {
// 	readonly name: "pepperoni";
// 	readonly description: "A spicy meat topping";
// 	readonly price: 0.75;
// } |
//   And so on...
// ];
```

Now we've got a type with all of the literal values from `TOPPINGS` as `readonly` properties in our type! From here, we can use indexed access types to create our `Topping` type from the `name` property:

```ts
const TOPPINGS = [
	// All of the toppings...
] as const;
type Topping = (typeof TOPPINGS)[number]['name'];
// type Topping = "pineapple" | "pepperoni" | "anchovy" | "peppers" | "olives" | "mushrooms";
```

And we can use this type to inform our `Pizza` type:

```ts
type Pizza = {
	diameter: number;
	crust: 'thin' | 'thick' | 'stuffed';
	sauce: 'red' | 'white';
	toppings: Array<Topping>;
	customer: string;
};
```

## Extra type safety with `satisfies`

Let's say we're factoring out the available crusts for making our `Pizza`. We could start with an array of strings, use a const assertion to use the literal values and avoid widening, and then again use our indexed access types to create a type from that array:

```ts
const CRUSTS = ['thin', 'thick', , 'stuffed'] as const;

type Crust = (typeof CRUSTS)[number];
// type Crust = 'thin' | 'thick' | 'stuffed' | undefined;
```

Well, almost there. Notice that we have an `undefined` type in there. That's because we have an extra comma in our array. This is effectively the same as saying `['thin', 'thick', undefined, 'stuffed']`.

You could detect the `undefined` with type annotations, but that can't be mixed with const assertions. The type cannot both be `string[]` and `readonly ['thin', 'thick', 'stuffed']`.

```ts
// We can detect the undefined type, but we can't use const assertions
const CRUSTS: string[] = ['thin', 'thick', , 'stuffed'];
// Type '(string | undefined)[]' is not assignable to type 'string[]'

// Or we can use const assertions, but we can't detect the undefined type
const CRUSTS = ['thin', 'thick', , 'stuffed'] as const;
// const CRUSTS: readonly ["thin", "thick", undefined, "stuffed"]

// But we can't do both!
const CRUSTS: string[] = ['thin', 'thick', 'stuffed'] as const;
// The type 'readonly ["thin", "thick", "stuffed"]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.
```

To avoid this issue, we can use `satisfies` to confirm that the value conforms to a certain intended shape. In our case, we want to confirm that the array is a tuple of strings. We don't need TypeScript to confirm which strings exactly—only that it matches the intended shape.

```ts
// We detect the error, but without giving CRUSTS a specific type!
const CRUSTS = ['thin', 'thick', , 'stuffed'] satisfies string[];
// Type '(string | undefined)[]' does not satisfy the expected type 'string[]'.
```

We can further combine `satifies` with `as const` to get the literal values we want while verifying that the array is a tuple of strings:

```ts
// Assert that the values of the array are literal values that satisfy the type readonly string[]
const CRUSTS = [
	'thin',
	'thick',
	'stuffed',
] as const satisfies readonly string[];

type Crust = (typeof CRUSTS)[number];
// type Crust = "thin" | "thick" | "stuffed"
```

With `as const`, we tell TypeScript that it should not widen the inferred type of `CRUSTS` and that we expect it to be the literal values given. And with `satisfies readonly string[]`, we tell TypeScript that `CRUSTS` should satisfy the shape of an array of readonly strings. Now we can't accidentally add an extra comma or other value to the array, and we can still use the literal values from `CRUST` to create new types.

## Conclusion

The combination of indexed access types, const assertions, and the `satisfies` operator, give us a lot of power to create types that are more specific, and more accurate. You can use them to transform your data into useful types, rather than attempting to duplicate that information manually, and inevitably having the data and types fall out of sync. This can ultimately save you and your team a lot of time, effort, and headache.

If you want to view the examples in this article in a runnable playground, you can find them at the TypeScript playground.
