import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import { Heading1 } from '../components/Headings';

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
      <Heading1 style={{ marginBottom: '1rem' }}>¯\_(ツ)_/¯</Heading1>
      <p>Sorry, no idea what you're looking for.</p>
      <StyledLink to="/">Best go home, now.</StyledLink>
    </div>
  </Layout>
);

export default NotFoundPage;
