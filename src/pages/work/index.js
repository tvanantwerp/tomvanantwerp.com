import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h1>Index of Work</h1>
      <a href="/work/sbtci">SBTCI</a>
      <a href="/work/taxfoundation">taxfoundation.org</a>
      <a href="/work/tax-calculator">Tax Calculator</a>
    </Layout>
  );
};

export default IndexPage;
