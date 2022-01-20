---
title: MailChimp Email Addresses Look Weird in Outlook? Here’s How to Fix It.
date: 2019-01-16
description: Fix garbled "from" addresses and make it possible to whitelist your mailings through MailChimp.
tags:
    - Technical Writing
    - MailChimp
    - DNS
    - SPF
    - DKIM
layout: layouts/writing.liquid
---

## The Problem

I get emails from lots of organizations that use MailChimp. How can I tell that they use MailChimp? Because their emails always start like this:

```
Sender <person=example.com@mail215.atl61.mcsv.net> on behalf of Sender <person@example.com>
```

I use Office 365 at work and usually browse email in Outlook. And every single MailChimp email I receive that way has a garbled From address just like above.

Because the email is sent by MailChimp’s servers, the From address usually includes the domain of that MailChimp server. This causes three problems:

1. It’s ugly.
2. I might think it’s spam.
3. I can never whitelist emails from your domain because it’s never your domain — it’s always a different MailChimp server!

This is fairly easy to fix. All you need to do are make [a few DNS tweaks to your domain](http://kb.mailchimp.com/accounts/email-authentication/set-up-custom-domain-authentication-dkim-and-spf) and your emails will no longer show this garbled mess in the From field in Outlook.

##The Fix

All you need to do are add two DNS records.

```
Type:  CNAME
Host:  k1._domainkey.example.com
Value: dkim.mcsv.net

Type:  TXT
Host:  example.com
Value: v=spf1 include:servers.mcsv.net ?all
```

That’s it! Once you’ve added/modified these DNS records, your email addresses sent from MailChimp to Outlook clients will look just fine!

You may already have a TXT record that begins `v=spf1`, in which case you just need to add `include:servers.mcsv.net` to the list of domains already in that record.

##The Explanation

When Outlook shows the garbled From address in the first place, it’s because it doesn’t know if it should trust the MailChimp server as a legitimate sender for your domain. [DKIM](https://support.google.com/a/answer/174124?hl=en) and [SPF](https://support.google.com/a/answer/33786?hl=en) records are designed to help email servers know who can or cannot legitimately send mail on behalf of a domain. With these records in place, emails will correctly display as `Sender <person@example.com>` because Outlook has a way to verify that MailChimp is authorized to send mail for the `example.com` domain.

{% include components/button-style-link, url: https://medium.com/@tvanantwerp/mailchimp-email-addresses-look-weird-in-outlook-heres-how-to-fix-it-bcafd99f8497, text: 'Originially published on Medium on September 22, 2016.' %}