import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import Tom from '../images/tom.svg';
import SocialLinks from '../components/SocialLinks';

const Container = styled.div`
  align-content: center;
  align-items: center;
  color: #fff;
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
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  text-align: center;

  @media screen and (min-width: 760px) {
    font-size: 3rem;
  }
`;

const HR = styled.hr`
  background-color: #fff;
  border: 0;
  height: 1px;
  width: 100%;
`;

const Description = styled.div`
  font-size: 1rem;
  margin: 0 1rem;
  padding: 0.5rem 1rem 0;
  text-align: justify;

  @media screen and (min-width: 760px) {
    font-size: 1.2rem;
  }
`;

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <img src={Tom} style={{ padding: '1rem', width: '100%' }} />
        <Name>Tom VanAntwerp</Name>
        <HR />
        <Description>
          <p style={{ marginBottom: '1rem', textAlign: 'center' }}>Web Development / Design / IT</p>
          <SocialLinks />
        </Description>
      </Container>
    </Layout>
  );
};

export default IndexPage;
