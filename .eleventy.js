const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginSEO = require("eleventy-plugin-seo");
const markdownIt = require("markdown-it");
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require('@iktakahiro/markdown-it-katex');
const mila = require('markdown-it-link-attributes');
const uslug = require('uslug');
const pluginSass = require("eleventy-plugin-sass");

const {imageShortcode, figureShortcode} = require('./images');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSass);
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Tom VanAntwerp",
    description: "TVA's Digital Garden",
    url: "https://tomvanantwerp.com",
    author: "Tom VanAntwerp",
    twitter: "tvanantwerp",
    image: "img/tom.png",
    options: {
      titleDivider: "|",
      imageWithBaseUrl: true,
      twitterCardType: "summary_large_image"
    }
  });

  eleventyConfig.setDataDeepMerge(true);

  // Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("image", imageShortcode);
  eleventyConfig.addShortcode("figure", figureShortcode);
  
  // Filters
  eleventyConfig.addFilter('sortByTitle', (values) => {
    return values.slice().sort((a, b) => a.data.title.localeCompare(b.data.title));
  });
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("DDD");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Passthroughs
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon");
  eleventyConfig.addPassthroughCopy("fonts");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItFootnote)
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "heading-anchor",
    permalinkSymbol: "#",
    slugify: s => uslug(s)
  }).use(markdownItKatex).use(mila, {
    pattern: /^https:\/\/(www\.)?(?!tomvanantwerp\.com|localhost).*/,
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  });
  markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
    const n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
    }
  
    return n;
  }
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};