import styled from 'styled-components';

const Heading1 = styled.h1`
  color: ${props => props.color || '#333'};
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  text-align: center;

  @media screen and (min-width: 760px) {
    font-size: 3rem;
  }
`;

export { Heading1 };
