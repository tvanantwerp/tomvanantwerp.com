import styled, { createGlobalStyle } from 'styled-components';
import {reset} from 'styled-reset';

import Head from '@components/head';
import Nav from '@components/nav';
import Footer from '@components/footer';

const GlobalStyle = createGlobalStyle`
  :root {
    --light-bg: #f5f5f5;
    --light-color: #21252B;
    --gray: #999;
    --dark-bg: #21252B;
    --dark-color: #eee;
    --max-width: 960px;
  }

  ${reset}

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, Oxygen-Sans, Ubuntu, Cantarell,
                "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;

    @media (prefers-color-scheme: light) {
      background-color: var(--light-bg);
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

  p {
    line-height: 1.4;
    margin: 1rem 0;
  }

  ul, ol {
    line-height: 1.4;
    margin: 1rem 0;
  }

  ul {
    list-style: circle;
  }

  ol {
    list-style: decimal-leading-zero;
  }

  li {
    margin-left: 1rem;
  }


  em {
    font-style: italic;
  }

  strong {
    font-style: bold;
  }

  a {
    color: inherit;
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  pre, code {
    font-family: monospace;
  }

  pre {
    overflow-x: auto;
    margin: 1rem 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: auto 1fr auto;
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
        <Footer />
      </Wrapper>
    </>
  );
}
