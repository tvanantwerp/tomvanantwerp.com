import Link from 'next/link';
import styled from 'styled-components';

import { siteTitle } from '@components/head';

const StyledHeader = styled.header`
  position: sticky;
`;

const Nav = styled.nav`
  align-items: end;
  display: grid;
  grid-gap: 1rem;
  grid-template: auto / 1fr repeat(3, auto);
`;

const SiteName = styled.h1`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
`;
const NavLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Nav>
        <SiteName>
          <Link href="/" passHref>
              <NavLink>
                {siteTitle}
              </NavLink>
          </Link>
        </SiteName>
        <Link href="/about" passHref>
          <NavLink>
            About
          </NavLink>
        </Link>
        <Link href="/writing" passHref>
          <NavLink>
            Writing
          </NavLink>
        </Link>
        <Link href="/projects" passHref>
          <NavLink>
            Projects
          </NavLink>
        </Link>
      </Nav>
    </StyledHeader>
  );
}
