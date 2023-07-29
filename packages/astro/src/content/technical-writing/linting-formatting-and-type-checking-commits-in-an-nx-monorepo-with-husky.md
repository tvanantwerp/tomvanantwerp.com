---
title: Linting, Formatting, and Type Checking Commits in an Nx Monorepo with Husky and lint-staged
date: 2023-05-10
description: This guide will show you how to set up pre-commit hooks to run linting, formatting, and type checking in an Nx monorepo.
canonical: https://labs.thisdot.co/blog/linting-formatting-and-type-checking-commits-in-an-nx-monorepo-with-husky/
use_canonical_url: true
tags:
  - Technical Writing
  - monorepo
  - linting
  - TypeScript
  - Nx
---

_This article was originally published on the [This Dot blog](https://labs.thisdot.co/blog/linting-formatting-and-type-checking-commits-in-an-nx-monorepo-with-husky/)._

One way to keep your codebase clean is to enforce linting, formatting, and type checking on every commit. This is made very easy with pre-commit hooks. Using [Husky](https://typicode.github.io/husky/#/), you can run arbitrary commands before a commit is made. This can be combined with lint-staged, which allows you to run commands on only the files that have been staged for commit. This is useful because you don't want to run linting, formatting, and type checking on every file in your project, but only on the ones that have been changed.

But if you're using an Nx monorepo for your project, things can get a little more complicated. Rather than have you use eslint or prettier directly, Nx has its own scripts for linting and formatting. And type checking is complicated by the use of specific tsconfig.json files for each app or library. Setting up pre-commit hooks with Nx isn't as straightforward as in a simpler repository.

This guide will show you how to set up pre-commit hooks to run linting, formatting, and type checking in an Nx monorepo.

## Configure Formatting

Nx comes with a command, nx format:write for applying formatting to affected files which we can give directly to lint-staged. This command uses [Prettier](https://prettier.io/) under the hood, so it will abide by whatever rules you have in your root-level .prettierrc file. Just install Prettier, and add your preferred configuration.

```
npm install --save-dev prettier
```

Then add a .prettierrc file to the root of your project with your preferred configuration. For example, if you want to use single quotes and trailing commas, you can add the following:

```
{
    "singleQuote": true,
    "trailingComma": "all"
}
```

## Configure Linting

Nx has its own plugin that uses ESLint to [lint projects in your monorepo](https://nx.dev/packages/linter). It also has a plugin with [sensible ESLint defaults](https://nx.dev/packages/eslint-plugin-nx) for your linter commands to use, including ones specific to Nx. To install them, run the following command:

```
npm i --save-dev @nrwl/linter @nrwl/eslint-plugin-nx
```

Then, we can create a default .eslintrc.json file in the root of our project:

```
{
  "root": true,
  "ignorePatterns": ["**/*"],
  "plugins": ["@nrwl/nx"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@nrwl/nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@nrwl/nx/typescript"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "extends": ["plugin:@nrwl/nx/javascript"],
      "rules": {}
    }
  ]
}
```

The above ESLint configuration will, by default, apply [Nx's module boundary rules](https://nx.dev/packages/eslint-plugin-nx#enforce-module-boundaries-rule) to any TypeScript or JavaScript files in your project. It also applies its recommended rules for JavaScript and TypeScript respectively, and gives you room to add your own.

You can also have ESLint configurations specific to your apps and libraries. For example, if you have a React app, you can add a .eslintrc.json file to the root of your app directory with the following contents:

```
{
    "extends": ["plugin:@nrwl/nx/react", "../../.eslintrc.json"],
    "rules": {
        "no-console": ["error", { "allow": ["warn", "error"] }]
      }
}
```

### Set Up Type Checking

Type checking with tsc is normally a very straightforward process. You can just run tsc --noEmit to check your code for type errors. But things are more complicated in Nx with lint-staged.

There are a two tricky things about type checking with lint-staged in an Nx monorepo. First, different apps and libraries can have their own tsconfig.json files. When type checking each app or library, we need to make sure we're using that specific configuration. The second wrinkle comes from the fact that lint-staged passes a list of staged files to commands it runs by default. And tsc will only accept either a specific tsconfig file, or a list of files to check.

We do want to use the specific tsconfig.json files, and we also only want to run type checking against apps and libraries with changes. To do this, we're going to create some Nx run commands within our apps and libraries and run those instead of calling tsc directly.

Within each app or library you want type checked, open the project.json file, and add a new run command like this one:

```
{
    // ...
    "targets": {
        // ...
        "typecheck": {
      "executor": "nx:run-commands",
      "options": {
        "commands": ["tsc -p tsconfig.app.json --noEmit"],
        "cwd": "apps/directory-of-your-app-goes-here",
        "forwardAllArgs": false
      }
    },
    }
}
```

Inside commands is our type-checking command, using the local tsconfig.json file for that specific Nx app. The cwd option tells Nx where to run the command from. The forwardAllArgs option tells Nx to ignore any arguments passed to the command. This is important because tsc will fail if you pass both a tsconfig.json and a list of files from lint-staged.

Now if we ran nx affected --target=typecheck from the command line, we would be able to type check all affected apps and libraries that have a typecheck target in their project.json. Next we'll have lint-staged handle this for us.

## Installing Husky and lint-staged

Finally, we'll install and configure Husky and lint-staged. These are the two packages that will allow us to run commands on staged files before a commit is made.

```
npm install --save-dev husky lint-staged
```

In your package.json file, add the prepare script to run Husky's install command:

```
{
    "scripts": {
        "prepare": "husky install"
    }
}
```

Then, run your prepare script to set up git hooks in your repository. This will create a .husky directory in your project root with the necessary file system permissions.

```
npm run prepare
```

The next step is to create our pre-commit hook. We can do this from the command line:

```
npx husky add .husky/pre-commit "npx lint-staged --concurrent false --relative"
```

It's important to use Husky's CLI to create our hooks, because it handles file system permissions for us. Creating files manually could cause problems when we actually want to use the git hooks. After running the command, we will now have a file at .husky/pre-commit that looks like this:

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged --concurrent false --relative
```

Now whenever we try to commit, Husky will run the lint-staged command. We've given it some extra options. First, --concurrent false to make sure attempts to write fixes with formatting and linting don't conflict with simultaneous attempts at type checking. Second is --relative, because our Nx commands for formatting and linting expect a list of file paths relative to the repo root, but lint-staged would otherwise pass the full path by default.

We've got our pre-commit command ready, but we haven't actually configured lint-staged yet. Let's do that next.

## Configuring lint-staged

In a simpler repository, it would be easy to add some lint-staged configuration to our package.json file. But because we're trying to check a complex monorepo in Nx, we need to add a separate configuration file. We'll call it lint-staged.config.js and put it in the root of our project.

Here is what our configuration file will look like:

```
module.exports = {
  '{apps,libs,tools}/**/*.{ts,tsx}': files => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': [
    files => `nx affected:lint --files=${files.join(',')}`,
    files => `nx format:write --files=${files.join(',')}`,
  ],
  };
```

Within our module.exports object, we've defined two globs: one that will match any TypeScript files in our apps, libraries, and tools directories, and another that also matches JavaScript and JSON files in those directories. We only need to run type checking for the TypeScript files, which is why that one is broken out and narrowed down to only those files.

These globs defining our directories can be passed a single command, or an array of commands. It's common with lint-staged to just pass a string like tsc --noEmit or eslint --fix. But we're going to pass a function instead to combine the list of files provided by lint-staged with the desired Nx commands.

The nx affected and nx format:write commands both accept a --files option. And remember that lint-staged always passes in a list of staged files. That array of file paths becomes the argument to our functions, and we concatenate our list of files from lint-staged into a comma-delimitted string and interpolate that into the desired Nx command's --files option. This will override Nx's normal behavior to explicitly tell it to only run the commands on the files that have changed and any other files affected by those changes.

## Testing It Out

Now that we've got everything set up, let's try it out. Make a change to a TypeScript file in one of your apps or libraries. Then try to commit that change. You should see the following in your terminal as lint-staged runs:

```
Preparing lint-staged...
Running tasks for staged files...
  lint-staged.config.js
        {apps,libs,tools}/**/*.{ts,tsx}
            nx affected --target=typecheck --files=apps/your-app/file-you-changed.ts
        {apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}
            nx affected:lint --files=apps/your-app/file-you-changed.ts
            nx format:write --files=apps/your-app/file-you-changed.ts
Applying modifications from tasks...
Cleaning up your temporary files...
```

Now, whenever you try to commit changes to files that match the globs defined in lint-staged.config.js, the defined commands will run first, and verify that the files contain no type errors, linting errors, or formatting errors. If any of those commands fail, the commit will be aborted, and you'll have to fix the errors before you can commit.

## Conclusion

We've now set up a monorepo with Nx and configured it to run type checking, linting, and formatting on staged files before a commit is made. This will help us catch errors before they make it into our codebase, and it will also help us keep our codebase consistent and readable. To see an example Nx monorepo with these configurations, check out [this repo](https://stackblitz.com/github/tvanantwerp/nx-precommit-hooks?file=lint-staged.config.js).
