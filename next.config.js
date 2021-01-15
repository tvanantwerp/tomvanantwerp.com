const withPlugins = require('next-compose-plugins');
const rehypePrism = require('@mapbox/rehype-prism');

const mdx = require("@next/mdx")({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [
      rehypePrism
    ]
  }
});

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx"]
}

module.exports = withPlugins([mdx], nextConfig);
