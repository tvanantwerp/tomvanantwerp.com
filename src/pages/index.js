import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Tom from '../images/tom_poly.svg';

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

const IndexPage = () => (
  <Layout>
    <Container>
      <img src={Tom} style={{ width: '100%' }} />
    </Container>
  </Layout>
);

export default IndexPage;
