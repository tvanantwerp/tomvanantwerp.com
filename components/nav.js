import Link from 'next/link';
import styled from 'styled-components';

import { siteTitle } from './head';

const Heading = styled.a`
  cursor: pointer;
  text-decoration: none;

  @media (prefers-color-scheme: light) {
    color: var(--light-color);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--dark-color);
  }

  &:hover,
  &:active,
  &:visited {
    @media (prefers-color-scheme: light) {
      color: var(--light-color);
    }

    @media (prefers-color-scheme: dark) {
      color: var(--dark-color);
    }
  }

  h1 {
    display: inline-block;
  }
`;

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Heading>
          <h1>{siteTitle}</h1>
        </Heading>
      </Link>
    </header>
  );
}
