import Link from 'next/link';
import { createGlobalStyle } from 'styled-components';

import Head, { siteTitle } from './head';

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
    <>
      <GlobalStyle />
      <Head />
      <header>
        <Link href="/">
          <a>
            <h1>{siteTitle}</h1>
          </a>
        </Link>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
