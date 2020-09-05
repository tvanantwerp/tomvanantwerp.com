import Head from 'next/head';
import Link from 'next/link';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

export const siteTitle = 'Tom VanAntwerp';

const GlobalStyle = createGlobalStyle`
:root {
  --light-bg: #fff;
  --light-color: #333;
  --dark-bg: #333;
  --dark-color: #fff;
}

html, body {
  margin: 0;
  padding: 0;

  @media (prefers-color-scheme: light) {
    background-color: var(--ligt-bg);
    color: var(--light-color);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--dark-bg);
    color: var(--dark-color);
  }
}

* {
  box-sizing: border-box;
}
`;

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyle />
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
