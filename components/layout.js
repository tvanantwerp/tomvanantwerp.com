import styled, { createGlobalStyle } from 'styled-components';

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
`;

const Wrapper = styled.div`
  margin: 1rem auto;
  max-width: var(--max-width);
  min-height: calc(100vh - 2rem);
  padding: 1rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Head />
      <Wrapper>
        <Nav />
        <main>{children}</main>
        <footer></footer>
      </Wrapper>
    </>
  );
}
