import styled, { createGlobalStyle } from 'styled-components';
import {reset} from 'styled-reset';

import Head from '@components/head';
import Nav from '@components/nav';
import Footer from '@components/footer';

const GlobalStyle = createGlobalStyle`
  :root {
    --light-bg: #eee;
    --light-color: #21252B;
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

  p {
    line-height: 1.4;
  }

  em {
    font-style: italic;
  }

  strong {
    font-style: bold;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: grid;
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
