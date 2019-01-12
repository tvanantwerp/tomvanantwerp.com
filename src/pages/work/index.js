import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h1>Index of Work</h1>
      <Link to="/work/sbtci">SBTCI</Link>
      <Link to="/work/taxfoundation">taxfoundation.org</Link>
      <Link to="/work/tax-calculator">Tax Calculator</Link>
    </Layout>
  );
};

export default IndexPage;
