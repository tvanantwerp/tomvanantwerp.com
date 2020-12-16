import {useState, useEffect} from 'react';
import Head from '@components/head';
import Link from 'next/link';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: grid;
  align-content: center;
  height: 100%;
`;

const AboutContent = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

const yearsFromMs = ms => ms/1000/60/60/24/365.25;

const About = () => {
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(new Date().getTime() - new Date('2004-01-01').getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInMilliseconds(new Date().getTime() - new Date('2004-01-01').getTime());
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <>
      <Head title="About" />
      <AboutContainer>
        <AboutContent>
          <h1>So who is this Tom VanAntwerp person anyway?</h1>
          <p>Tom is a technologist living and working around Washington, DC. For roughly <span style={{fontVariantNumeric: 'tabular-nums'}}>{Intl.NumberFormat('en-US').format(Math.round(timeInMilliseconds/1000))}</span> seconds (or about {Math.round(yearsFromMs(timeInMilliseconds) * 10) / 10} years) he's been designing and coding websites, creating interactive data visualizations, and building out IT infrastructure.</p>
          <p>To see some examples of Tom's work, check out <Link href="/projects" passHref><a>projects</a></Link>.</p>
          <p>To contact Tom, just yell really loud and maybe he'll hear you. Alternatively, get in touch via <a href="https://twitter.com/tvanantwerp" target="_blank" rel="noopener noreferrer">Twitter</a>.</p>
        </AboutContent>
      </AboutContainer>
    </>
  );
}

export default About;