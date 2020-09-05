import Head from 'next/head';

export const siteTitle = 'Tom VanAntwerp';

export default function MyHead({ children }) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Personal website of Tom VanAntwerp." />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Head>
  );
}
