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
      const links = data.site.siteMetadata.externalLinks;
      return (
        <ListOfLinks style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}>
          {links.map(({ url, name }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={withPrefix(`social-icons/${name.toLowerCase()}-logo.svg`)} alt={name} />
                {name}
              </a>
            </li>
          ))}
        </ListOfLinks>
      );
    }}
  />
);

export default SocialLinks;
