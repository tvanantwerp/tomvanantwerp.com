import Head from 'next/head';

export const siteTitle = 'Tom VanAntwerp';

const setTitle = (title) => `${title} | ${siteTitle}`;

export default function MyHead({ title, description, children }) {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#ef5556" />
      <meta name="msapplication-TileColor" content="#21252b" />
      <meta name="theme-color" content="#21252b" />
      <title key="title">{title ? setTitle(title) : siteTitle}</title>
      <meta key="description" name="description" content={description || "Personal website of Tom VanAntwerp."} />
      <meta key="ohtitle" name="og:title" content={title ? setTitle(title) : siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
        integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
        crossOrigin="anonymous"
      />
      {children}
    </Head>
  );
}
