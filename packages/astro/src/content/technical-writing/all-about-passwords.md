---
title: All About Passwords
date: 2021-03-29
description: How to create and manage your logins while maximizing security and ease.
tags:
  - Technical Writing
  - Security
  - Operations
image: img/2021-03-30-keyboard-unlock.jpg
image_alt: A Japanese laptop keyboard with a padlock sitting on top of it.
splash_image: img/2021-03-30-keyboard-unlock.jpg
---

Nobody enjoys typing passwords to log in. Nobody!

Every website has slightly different requirements. Your standard `RoverIsAGoodBoy` didn't work on this site? Oh, must've needed a number—try `RoverIsAGoodBoy1`. No? Maybe a symbol. `RoverIsAGoodBoy!`. Or both? `RoverIsAGoodBoy1!`. Wait, when did you create this account? Maybe it was your previous standard password: `password1234`.

If the above looks familiar to you: 1) I empathize and 2) I am here to rescue you from this hell!

## Use a Password Manager

Password managers are programs that remember your logins for you. They keep a list of your usernames and passwords in an encypted database that only you can access. All you need to remember is the password that opens your password manager—after that, it's just a matter of copy-and-paste.

The relief that comes from using a password manager is enormous. You've probably never thought about how much mental space your passwords are taking up. Well, I have. Not counting work logins, I've got **three hundred and eighty one** usernames and passwords. That is 381 things that would hurt my head every day of my life, if I were foolish enough to try to memorize them all.

Perhaps you ease the burden by using the same password everywhere. But if you're reusing `RoverIsAGoodBoy1!` on every website, then you're at risk of hackers getting into **all** of your accounts if there is a data breach at **one** of your accounts. It's standard practice for hackers to take usernames and passwords from a compromised site, and start plugging them into other sites like email providers and banks. If you use the same password for your email, your bank, and your favorite Harry Potter fanfiction forum, then you can kiss your email and banking logins goodbye when a nefarious hacker inevitably breaks into that woefully insecure guilty pleasure.

"But I have a system!" you say. "On each site I do `<<some_permutation_I_can_remember>>`." Yeah, OK, that's better—until someone figures out your system. It's probably not as clever as you think it is, and it's still taking up space in your brain that is better allocated to learning linear algebra or another Netflix binge.

With a password manager, every password you have can be random and unique. Each one can look something like `#q$5742!mpX*8a6HR` or `NFAVL^CJ#vDLi1m` or `Vpo8$r0d$3HzkCm` or `v!Vua3GZX0pnPdnVD` because the manager remembers it for you. A data breach on one site doesn't make your other logins vulnerable.

As for what password manager to use, you've got several options. [KeePass](https://keepass.info/) is a good choice if you want to keep your encrypted vault as a local file. If you're comfortable with a hosted service, you've got lots of options: [1Password](https://1password.com/), [LastPass](https://www.lastpass.com/), [Dashlane](https://www.dashlane.com/), and probably others I don't know about yet. I also hear rave reviews of [BitWarden](https://bitwarden.com/) from the folks at [r/sysadmin](https://bitwarden.com/help/article/forgot-master-password/).

## Strong Passwords

Sometimes you don't have the option to use a password manager. Prime example: the password that gets you into your password manager! Luckily, there's a very easy method for creating passwords that are very easy to remember and very hard to crack. I'll just let [XKCD](https://xkcd.com/936/) explain:

![XKCD comic on password strength](https://imgs.xkcd.com/comics/password_strength.png)

Just a few random words are pretty easy to memorize and difficult to crack due to their length. It's important that the words are random, as a cracking program would be smart enough to guess common phrases first. But it's not too hard to remember a sequence of random words—especially since you'll be using it a lot.

I wrote a very simple tool a few years back to [generate random word passwords](https://alea.tomvanantwerp.com/). Feel free to give it a try whenever you're in need of one. (Disclaimer: it really, truly uses random words. Some of these words are not polite words. I take no responsibility if it generates something offensive, which it sometimes does.)

## Knowledge-Based Authentication

You've probably "secured" an account by answering a question like "What street did you grow up on?" or "What is your dog's name?"[^1] These questions are often easily answered by people who aren't you. I can check your Instagram and see the pictures of you and the dog outside your childhood home with the street sign in view—now I've got all the answers I need.

When answering these questions, answer with gibberish. Then store that gibberish in your password manager. Use the exact same `correcthorsebatterystaple` technique from before. I don't recommend a random password like `yLiaNEX34$NnSR051S2i` because sometimes you have to read these to customer support over the phone. It's not fun.

## Multi-Factor Authentication

After passwords, the next thing nobody enjoys is checking their phone for a two-factor authentication code. Nobody!

I have some bad news: you're just going to have to deal with this one. It's not fun, but it's very important to protect yourself from hackers.

Getting a text message to confirm your logins is better than no secondary authentication. Using a dedicated app is better still, as it's not vulnerable to a SIM swapping attack.

But if you really don't want to deal with these MFA codes, you can use a device like a [YubiKey](https://www.yubico.com/) instead. It's a device that can plug in to USB as a form of authentication. In the way that a code sent to your phone authenticates you because it's assumed only you have your phone, a YubiKey authenticates you because it's assumed only you would possess this USB key. Personally, I'm more afraid of losing this than I am of losing my phone, but it's an option and definitely more secure than texting or apps.

[^1]: We've already established that it's Rover, and that he's a good boy.
