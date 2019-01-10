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
  text-align: center;
`;

const Description = styled.div`
  margin: 0 1rem;
  padding: 0 1rem;
  text-align: justify;
`;

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <img src={Tom} style={{ padding: '1rem', width: '100%' }} />
        <Name>Tom VanAntwerp</Name>
        <hr />
        <Description>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'center' }}>Web Development / Design / IT</p>
          <SocialLinks />
        </Description>
      </Container>
    </Layout>
  );
};

export default IndexPage;
