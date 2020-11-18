import Link from 'next/link';
import styled from 'styled-components';

import { siteTitle } from '@components/head';

const StyledFooter = styled.footer`
  color: var(--gray);
  display: grid;
  grid-template: auto / 1fr auto;
  font-size: 0.8rem;

  a {
    color: inherit;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>{`© ${siteTitle} ${new Date().getFullYear()}`}</p>
      <p>Find me at <a href="https://twitter.com/tvanantwerp" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://github.com/tvanantwerp/" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    </StyledFooter>
  );
}
