import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';

const Heading = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 2rem;
  text-align: center;

  @media screen and (min-width: 760px) {
    font-size: 3rem;
  }
`;

const StyledLink = styled(Link)`
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  display: inline-block;
  color: #ef4d66;
  margin: 12px 0;
  padding: 6px;
  text-decoration: none;
`;

const NotFoundPage = () => (
  <Layout>
    <div style={{ alignSelf: 'center', textAlign: 'center' }}>
      <Heading>¯\_(ツ)_/¯</Heading>
      <p>Sorry, no idea what you're looking for.</p>
      <StyledLink to="/">Best go home, now.</StyledLink>
    </div>
  </Layout>
);

export default NotFoundPage;
