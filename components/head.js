import Head from 'next/head';

export const siteTitle = 'Tom VanAntwerp';

const setTitle = (title) => `${title} | ${siteTitle}`;

export default function MyHead({ title, description, children }) {
  return (
    <Head>
      <title key="title">{title ? setTitle(title) : siteTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta key="description" name="description" content={description || "Personal website of Tom VanAntwerp."} />
      <meta key="ohtitle" name="og:title" content={title ? setTitle(title) : siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {children}
    </Head>
  );
}
