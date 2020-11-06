import styled from 'styled-components';

const Splash = styled.div`
  align-items: center;
  display: grid;
  font-size: 1.4rem;
  font-weight: 300;
  grid-gap: 1rem;
  grid-template: repeat(2, auto) / 1fr;
  grid-template-areas:
    "image"
    "text";

  img {
    max-width: 100%;
  }

  @media screen and (min-width: 560px) {
    grid-template: auto / 2fr 1fr;
    grid-template-areas:
      "text image";
  }
`;

const Image = styled.img`
  grid-area: image;
`;

const Text = styled.div`
  grid-area: text;
`;

const Intro = styled.p`
  font-size: 1rem;
  font-size: max(6vw, 1rem);
  font-style: normal;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  @media screen and (min-width: 400px) and (max-width: 560px) {
    font-size: max(6.5vw, 1rem);
  }

  @media screen and (min-width: 560px) {
    font-size: 1rem;
    text-align: left;
  }
`;

const Description = styled.p`
  display: block;
  font-size: 1rem;
  font-weight: 700;

  @media screen and (min-width: 560px) {
    font-size: calc(1rem + 1vw);
  }
`;

export default function Home() {
  return (
    <div>
      <Splash>
        <Image src="/tom.png" alt="Illustration of Tom VanAntwerp" />
        <Text>
          <Intro>Hi there! I'm Tom VanAntwerp.</Intro>
          <Description>I build web apps and metabolize ingested organic matter.</Description>
        </Text>
      </Splash>
    </div>
  );
}
