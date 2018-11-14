import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import Tom from '../images/tom.svg';
import SocialLinks from '../components/SocialLinks';

const Container = styled.div`
  align-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
  height: 100%;
  margin: 0 auto;
  max-width: 480px;
`;

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <img src={Tom} style={{ padding: '1rem', width: '100%' }} />
        <SocialLinks />
      </Container>
    </Layout>
  );
};

export default IndexPage;
