---
title: 'JavaScript Errors: An Introductory Primer'
date: 2023-07-14
description: Once you understand how to use and handle Errors, you'll find them a much better debugging tool than always reaching for console.log.
canonical: https://labs.thisdot.co/blog/javascript-errors-an-introductory-primer/
use_canonical_url: true
tags:
  - Technical Writing
  - JavaScript
  - error handling
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/javascript-errors-an-introductory-primer/)._

JavaScript `Errors` are an integral part of the language, and its runtime environment. They provide valuable feedback when something goes wrong during the execution of your script. And once you understand how to use and handle `Errors`, you'll find them a much better debugging tool than always reaching for `console.log`.

## Why Use Errors?

When JavaScript throws errors, it's usually because there's a mistake in the code. For example, trying to access properties of `null` or `undefined` would throw a `TypeError`. Or trying to use a variable before it has been declared would throw a `ReferenceError`. But these can often be caught before execution by properly linting your code.

More often, you'll want to create your own errors in your programs to catch problems unique to what you're trying to build. Throwing your own errors can make it easier for you to interrupt the control flow of your code when necessary conditions aren't met.

Why would you want to use `Error` instead of just `console.log`ging all sorts of things?

Because an `Error` will force you to address it. JavaScript is optimistic. It will do its best to execute despite all sorts of issues in the code. Just logging some problem might not be enough to notice it. You could end up with subtle bugs in your program and not know!

Using `console.log` won't stop your program from continuing to execute. An Error, however, interrupts your program. It tells JavaScript, "we can't proceed until we've fixed this problem". And then JavaScript happily passes the message on to you!

## Using Errors in JavaScript

Here's an example of throwing an error:

```js
throw new Error('Informative message about your error goes here');
```

When an `Error` is thrown, nothing after that `throw` in your scope will be executed. JavaScript will instead pass the `Error` to the nearest error handler higher up in the call stack. If no handler is found, the program terminates.

Since you probably don't want your programs to crash, it's important to set up `Error` handling. This is where something like `try` / `catch` comes in. Any code you write inside the `try` will attempt to execute. If an `Error` is thrown by anything inside the `try`, then the following `catch` block is where you can decide how to handle that `Error`.

```js
try {
	if (someBadThingHappened) {
		throw new Error('That bad thing happened!');
	}
} catch (error) {
	// Using console.error here is just an example of what
	// you might do. But you're free to write any error
	// handling logic you want!
	console.error(error); // logs "Error: That bad thing happened"
}
```

In the catch block, you receive an error object (by convention, this is usually named `error` or `err`, but you could give it any name) which you can then handle as needed.

### Asynchronous Code and Errors

There are two ways to write asynchronous JavaScript, and they each have their own way of writing `Error` handling. If you're using `async` / `await`, you can use the `try` / `catch` block as in the previous example. However, if you're using `Promise`s, you'll want to chain a `catch` to the `Promise` like so:

```js
somePromise.then(handleResolvedPromiseFn).catch(error => {
	// handle the error here
});
```

## Understanding the Error Object

The `Error` object is a built-in object that JavaScript provides to handle runtime errors. All types of errors inherit from it. `Error` has several useful properties.

- [`message`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message): Probably the most useful of `Error`'s properties, `message` is a human-readable description of the error. When creating a new `Error`, the string you pass will become the message.
- [`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name): A string representing the error type. By default, this is `Error`. If you're using a built-in sub-class of `Error` like `TypeError`, it will be that instead. Otherwise, if you're creating a custom type of `Error`, you'll need to set this in the constructor.
- [`stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack): While technically non-standard, `stack` is a [widely supported](https://caniuse.com/mdn-javascript_builtins_error_stack) property that gives a full stack trace of where the error was created.
- [`cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause): This property allows you to give more specific data when throwing an error. For example, if you want to add a more detailed message to a caught error, you could throw a new `Error` with your message and pass the original `Error` as the cause. Or you could add structured data for easier error analysis.

Creating an Error object is quite straightforward:

```js
// Here, we create a new Error with the new constructor
// and pass a string to it as the message.
const myError = new Error('Something went wrong');

// Will log "Error: Something went wrong" to the console in red.
// Includes a stack trace to show you where the error came from.
console.error(myError);
```

In addition to the generic `Error`, JavaScript provides several built-in sub-classes of Error:

- `EvalError`: Thrown when a problem occurs with the `eval()` function. This only exists for backwards compatibility, and will not be thrown by JavaScript. [You shouldn't use `eval()` anyway](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!).
- `InternalError`: Non-standard error thrown when something goes wrong in the internals of the JavaScript engine. [Really only used in Firefox](https://caniuse.com/?search=internalerror).
- `RangeError`: Thrown when a value is not within the expected range.
- `ReferenceError`: Thrown when a value doesn't exist yet / hasn't been initialized.
- `SyntaxError`: Thrown when a parsing error occurs.
- `TypeError`: Thrown when a variable is not of the expected type.
- `URIError`: Thrown when using a global URI handling function incorrectly.
  Each of these error types inherits from the Error object and generally adds no additional properties or methods, but they do change the `name` property to reflect the error type.

## Making Your Own Custom Errors

It's sometimes useful to extend the `Error` object yourself! This lets you add properties to particular `Error`s you throw, as well as easily check in `catch` blocks if an `Error` is of a particular type.

To extend `Error`, use a `class`.

```js
class CustomError extends Error {
	constructor(message) {
		super(message);
		this.name = 'CustomError';
		this.foo = 'bar';
	}
}

try {
	if (someSpecialCircumstance) {
		throw new CustomError('My very own error!');
	}
} catch (error) {
	if (error instanceof CustomError) {
		console.log(error.message); // 'My very own error!'
		console.log(error.name); // CustomError
		console.log(error.foo): // 'bar'
	}
}
```

In this example, `CustomError` extends the `Error` class. It changes the name to `CustomError` and gives it the new property `foo: 'bar'`. You can then `throw` your `CustomError`, check if the error in your `catch` block is an instance of the `CustomError`, and access the properties associated with your `CustomError`. This gives you a lot more control over how `Error`s are structured and validated, which could greatly aid with debugging because your errors won't all just be `Error`s.

## Common Confusions

There are many ways that using `Error`s can go subtly wrong. Here are some of the common issues to keep in mind when working with `Error`.

### Failure to Catch

When an `Error` is thrown, the program will cease executing anything else in its scope and start working its way back up the call stack until it finds a `catch` block to deal with the `Error`. If it never finds a `catch`, the program will crash. So it's important to make sure you actually `catch` your errors, or else you might terminate your program unintentionally for small and recoverable issues.

It's especially helpful to think about catching errors when you're executing code from external libraries which you don't control. You may import a function to handle something for you, and it unexpectedly throws an `Error`. You should anticipate this possibility and ask yourself: "Should this code go inside of a `try` / `catch` block?" to prevent an error like this from crashing your code.

### Network Requests Don't Throw on 400 and 500 Statuses

You might want to make a request to an API, and then handle an error if the request fails.

```js
// ❌ This won't handle all of the things that might go wrong
const data = fetch('/some/api/endpoint')
	.then(res => res.json())
	.catch(error => console.error(error));
```

Maybe you made a bad request and got back a `400`. Maybe you're not properly authenticated and got a `401` or `403`. Maybe the endpoint is invalid and you get a `404`. Or maybe the server is having a bad day and you get a `500`.

In none of those cases will you get an `Error`!

From JavaScript's point of view, your request worked. You sent some data to a place, and the place sent you something back. Mission accomplished! Except it's not. You need to deal with these HTTP error statuses. So if you want to handle responses that aren't OK, you need to do it explicitly.

To fix the previous example:

```js
// ✅ This will throw an error on a bad request
const data = fetch('/some/api/endpoint')
	.then(res => {
		if (!res.ok) {
			throw new Error(`Data fetch failed: ${res.statusText}`, { cause: res });
		}
		return res.json();
	})
	.catch(error => console.error(error));
```

### You Can Throw Anything

You should `throw new Error`s. But you could `throw 'literally anything'`. There's nothing forcing you to only throw an `Error`. However, it's a lot harder to handle your errors if there's no consistency in what to expect in your `catch` blocks. It's a best practice to only throw an `Error` and not any other kind of JavaScript object.

This problem becomes especially clear in TypeScript, when the default type of an error in a `catch` block is not `Error`, but `unknown`. TypeScript has no way to know if an error passed into the `catch` is going to actually be an `Error` or not, which can make it more frustrating to write error handling code. For this reason, it's often a good idea to check what exactly you've received before trying to handle it.

```ts
try {
	// ...
} catch (error: unknown) {
	if (error instanceof Error) {
		// Handle the error.
	} else {
		// Do something else that doesn't assum you know
		// what type the error is.
		console.error(error);
	}
}
```

(Alas, you cannot `throw` 🥳. That's a `SyntaxError`. But `throw new Error('🥳')` is still perfectly valid!)

## Conclusion

Wielding JavaScript `Error`s is a big upgrade from `console.log`ging all the things and hoping for the best. And it's not very hard to do it well! By using `Error`, your apps will be much more explicit in how you expect things to work, and how you expect things might not work. And when something does go wrong, you'll be more likely to notice and better equipped to figure out the problem.
