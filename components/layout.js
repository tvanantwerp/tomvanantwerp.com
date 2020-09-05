import Link from 'next/link';
import { createGlobalStyle } from 'styled-components';

import Head from './head';
import Nav from './nav';

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
      <Nav />
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
