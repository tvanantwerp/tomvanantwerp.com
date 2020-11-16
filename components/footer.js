import Link from 'next/link';
import styled from 'styled-components';

import { siteTitle } from '@components/head';

const StyledFooter = styled.footer`
  font-size: 0.8rem;
  text-align: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>{`© ${siteTitle} ${new Date().getFullYear()}`}</p>
    </StyledFooter>
  );
}
