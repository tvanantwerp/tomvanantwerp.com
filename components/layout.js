import { createGlobalStyle } from 'styled-components';

import Head from './head';
import Nav from './nav';

const GlobalStyle = createGlobalStyle`
:root {
  --light-bg: #eee;
  --light-color: #21252B;
  --dark-bg: #21252B;
  --dark-color: #eee;
  --max-width: 960px;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, Oxygen-Sans, Ubuntu, Cantarell,
               "Helvetica Neue", sans-serif;
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

header,
main,
footer {
  margin: 0 auto;
  max-width: var(--max-width);
  padding: 1rem;
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
