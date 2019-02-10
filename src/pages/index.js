import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import { Heading1 } from '../components/Headings';
import Tom from '../images/tom.svg';
import SocialLinks from '../components/SocialLinks';

const Container = styled.div`
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  place-content: center;
  place-items: center;
  margin: 1rem auto;
  max-width: 480px;
  min-height: 100vh;
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
        <img src={Tom} style={{ width: '100%' }} />
        <Heading1 color="#fff">Tom VanAntwerp</Heading1>
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
