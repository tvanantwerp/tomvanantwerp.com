import React from 'react';
import styled from 'styled-components';
import { withPrefix, StaticQuery, graphql } from 'gatsby';

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

const SocialLinks = () => (
  <ListOfLinks>
    <StaticQuery
      query={graphql`
        query ExternalLinksQuery {
          site {
            siteMetadata {
              externalLinks {
                name
                url
              }
            }
          }
        }
      `}
      render={data => {
        return data.site.siteMetadata.externalLinks.map(link => (
          <li key={link.name}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <img src={withPrefix(`social-icons/${link.name.toLowerCase()}-logo.svg`)} alt={link.name} />
              {link.name}
            </a>
          </li>
        ));
      }}
    />
  </ListOfLinks>
);

export default SocialLinks;
