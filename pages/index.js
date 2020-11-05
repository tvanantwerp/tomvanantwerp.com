import styled from 'styled-components';

const Splash = styled.div`
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 300;
`;

const Intro = styled.p`
  display: block;
  font-size: calc(2rem + 2vw);
  font-style: normal;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export default function Home() {
  return (
    <div>
      <Splash>
        <Intro>Hi there! I'm Tom.</Intro>
        <p>I build web stuff, write sometimes, and metabolize ingested organic matter.</p>
      </Splash>
    </div>
  );
}
