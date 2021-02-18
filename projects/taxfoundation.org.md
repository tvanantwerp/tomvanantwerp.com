---
title: TaxFoundation.org
excerpt: How I built taxfoundation.org to serve tens of millions of users per year with clarity and accessibility in mind.
tags:
  - projects
  - programmingProjects
layout: layouts/writing.liquid
image: ./img/taxfoundation-splash.jpg
splash: ./img/taxfoundation-splash.jpg
splash_alt: The 'About Us' page of taxfoundation.org viewed on a trendy MacBook Pro surrounded by chic decor serving no purpose.
---

The [Tax Foundation](https://taxfoundation.org) is one of America's oldest think tanks. Founded in 1937, they research and publish on how to create tax policy that funds government without unduly harming economic growth. Strategy has changed, of course, since 1937; now [taxfoundation.org](https://taxfoundation.org) is their primary publishing platform to reach policymakers and taxpayers alike.

Since launching its latest incarnation in early 2017, the website has seen nearly 50 million visitors. This new site was not just a cosmetic refresh, but a complete migration from Drupal to WordPress, and onto AWS for hosting. It represents the Tax Foundation's intentional shift to being digital-first with publication and distribution.

## Design

Nobody was particularly happy with the older version of taxfoundation.org's design. I'd call it dated, if it were appropriate to any known age of the web. The colors were jarring and the layouts harsh. It was not responsive, looked bad when printed, and was very difficult to modify due to previous technical decisions.

{% include components/images-two-side-by-side,
  image1: './img/2017-02-01-old-tf-site.jpg',
  image1alt: 'The previous incarnation of taxfoundation.org.',
  image2: './img/2017-02-01-new-tf-site.jpg',
  image2alt: 'The current incarnation of taxfoundation.org.',
  caption: 'Compare the previous version and new version of taxfoundation.org.'
%}

Taking inspiration from high-quality news websites, the new version of taxfoundation.org puts content legibility first. It implements lighter colors, improved typography, and plenty of white space to improve the reading experience. Since many of our visitors are older, the site layout scales to work at high magnification as well as it does at default. And not only is it now responsive for mobile devices, but it also looks good when printed.

## Technology

Design was the fun, almost easy part. The real challenge was extracting content from a tangled mess of roughyl 300 database tables (no, I do not know why there were so many tables!) and into a format that could be ingested by WordPress.

To do this, I wrote Python scripts to pull the data from MySQL, parse it to correct various HTML errors somehow introduced by the editor in Drupal, and stitch it all back together into CSV files that could be imported to WordPress. Getting this right took trial and error, but eventually I managed to cleanly extract the ≈12,000 pages of content and migrate them.

Files and images are stored in an S3 bucket with Cloudfront as a CDN in front of it. The site itself runs on an AWS EC2 instance, with a MariaDB database in RDS. The site runs on a single EC2 instance without any performance issues—even during traffic spikes—thanks in part to nginx caching.