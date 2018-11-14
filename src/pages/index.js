import React, { Component } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import Tom from '../images/tom.svg';

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

const ListOfLinks = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: #fff;
    font-family: sans-serif;
    text-decoration: none;
  }
`;

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <img src={Tom} style={{ padding: '1rem', width: '100%' }} />
        <StaticQuery
          query={graphql`
            query ExternalLinksQuery {
              site {
                siteMetadata {
                  externalLinks {
                    name
                    url
                    icon
                  }
                }
              }
            }
          `}
          render={data => (
            <ListOfLinks>
              {data.site.siteMetadata.externalLinks.map(link => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ListOfLinks>
          )}
        />
      </Container>
    </Layout>
  );
};

export default IndexPage;
