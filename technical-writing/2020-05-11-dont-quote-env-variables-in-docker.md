---
title: Don't Quote Environment Variables in Docker
date: 2020-05-11
description: While quoting an odd environment variable might make sense to deal with special characters normally, Docker just assumes the quotes are part of the value.
tags: 
    - Technical Writing
    - Docker
layout: layouts/writing.liquid
---

It's usually a good idea to store your app's environment variables separate from the app itself in a `.env` file. This allows you to easily have different values for development, staging, and production.

Normally when writing a `.env` file, you might have an unusual property like an API key that has lots of special characters. Typically you would quote this value to handle that.

```bash
# a normal environment variable, surrounded by single quotes
KEY='example bl4h 5tuFF 123@#%= ksjhbfdg'
```

Your system would know to treat what's *inside* the single quotes as the value of `KEY` and make it available to your app.

But Docker doesn't work this way.

Let's say you're passing a `.env` file into a Docker container via `docker-compose.yml`. Docker would interpret the quotes around the environment variables as part of the value itself!

For a real world example, here's an environment variable passed to the official WordPress Docker image and the resulting output in the container's `wp-config.php` file (value is random and not used for anything, obviously):

```bash
# environment variable in a .env file
WORDPRESS_DB_PASSWORD='Pr65s$CWv{P3k}4j6]I<j=U5n#keN&$D{{Uhv2@L'
```

```php
// output to wp-config.php
// notice the escaped \' at the beginning and end
define( 'DB_PASSWORD', '\'Pr65s$CWv{P3k}4j6]I<j=U5n#keN&$D{{Uhv2@L\'');
```

The database password in `wp-config.php` would be incorrect because Docker considered the single quotes as part of the key value!

So as weird and wrong as it appears, when using `.env` files with Docker, don't quote values! The above example done correctly would then look like this:

```bash
# environment variable in a .env file
WORDPRESS_DB_PASSWORD=Pr65s$CWv{P3k}4j6]I<j=U5n#keN&$D{{Uhv2@L
```

```php
// output to wp-config.php
define( 'DB_PASSWORD', 'Pr65s$CWv{P3k}4j6]I<j=U5n#keN&$D{{Uhv2@L');
```