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

const Name = styled.h1`
  color: #fff;
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 1rem;
  text-align: center;
`;

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <img src={Tom} style={{ padding: '1rem', width: '100%' }} />
        <Name>Tom VanAntwerp</Name>
        <div style={{ border: '1px solid #fff', margin: '1rem', padding: '1rem' }}>
          <p style={{ padding: '0 1rem' }}>
            A comprehensive meat-based solution for converting water, food, and oxygen into code. Pre-order now for
            exclusive collector's edition wearing silly socks.
          </p>
          <SocialLinks />
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
