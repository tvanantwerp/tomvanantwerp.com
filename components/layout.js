import styled from 'styled-components';

import GlobalStyle from '@components/styles';
import Head from '@components/head';
import Nav from '@components/nav';
import Footer from '@components/footer';

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
