const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx"]
});
