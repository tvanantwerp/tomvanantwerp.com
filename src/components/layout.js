import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import './layout.css';

const GlobalStyles = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #ffda9e 0%, #fcc394 17%, #f9ad8a 34%, #f69780 50%, #f48177 67%, #f1696f 84%, #ef4d66 100%);
    min-height: 100vh;
  }
`;

const LayoutContainer = styled.div`
  color: #333;
  margin: 0 auto;
  max-width: 1024px;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyles />
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { name: 'keywords', content: data.site.siteMetadata.keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
