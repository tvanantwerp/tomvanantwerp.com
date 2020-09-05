import Head from 'next/head';
import Link from 'next/link';

export const siteTitle = 'Tom VanAntwerp';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Personal website of Tom VanAntwerp."
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <Link href="/">
          <a>
            <h1>{siteTitle}</h1>
          </a>
        </Link>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
