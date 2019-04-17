import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import SocialIcons from './SocialIcons';

const ListOfLinks = styled.ul`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  text-align: center;

  li {
    display: inline-block;
    margin: 0 4px;
    text-align: center;
  }

  a {
    color: #fff;
    display: block;
    font-family: sans-serif;
    padding: 12px;
    text-decoration: none;
  }
`;

const SocialLinks = () => {
  const data = useStaticQuery(graphql`
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
  `);
  const links = data.site.siteMetadata.externalLinks;

  return (
    <ListOfLinks style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}>
      {links.map(({ url, name }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <SocialIcons service={name.toLowerCase()} fill="#fff" style={{ width: '24px' }} />
          </a>
        </li>
      ))}
    </ListOfLinks>
  );
};

export default SocialLinks;
