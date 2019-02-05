import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import SocialIcons from './SocialIcons';

const ListOfLinks = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;

  @media screen and (min-width: 760px) {
    grid-gap: 1rem;
    margin: 0;
  }

  li {
    margin: 0;
    text-align: center;
  }

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
                <SocialIcons service={name.toLowerCase()} fill="#fff" style={{ maxWidth: '1.6rem' }} />
              </a>
            </li>
          ))}
        </ListOfLinks>
      );
    }}
  />
);

export default SocialLinks;
