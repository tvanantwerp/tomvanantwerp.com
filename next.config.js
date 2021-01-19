const withPlugins = require('next-compose-plugins');
const rehypePrism = require('@mapbox/rehype-prism');
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

const mdx = require("@next/mdx")({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [
      remarkMath
    ],
    rehypePlugins: [
      rehypePrism,
      rehypeKatex
    ]
  }
});

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx"]
}

module.exports = withPlugins([mdx], nextConfig);
