---
title: Tax Plan Calculator
description: How I built an online tool for comparing changes to taxes owed under the Tax Cuts and Jobs Act versus previous law.
tags:
  - projects
  - programmingProjects
layout: writing
image: img/2018-02-18-tax-calculator.png
splash: img/2018-02-18-tax-calculator.png
splash_alt: The tax plan calculator as viewed on taxfoundation.org.
---

Nobody enjoys doing their taxes, and for an obvious reason: it's complicated. The forms are long, boring, and easily misunderstood. So my challenge was to help people get a sense of their tax burden without actually recreating the experience of tax filing—otherwise, who would bother using the tool!

{% include components/button-style-link, url: https://taxfoundation.org/tax-calculator/, text: 'Try the Tax Plan Calculator here.' %}

I accomplished this in two ways. First, show a selection of scenarios to compare rather than request information. Second, if someone does want to calculate their own taxes, I hid the majority of form fields until the user decides they need more.

This tool utilizes React on the front end for a dynamic experience, and Python and Flask on the backend to create a simple API for the Tax Foundation's individual tax calculator. (No information submitted by users is logged or retained!)
