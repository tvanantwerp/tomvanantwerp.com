import {useState, useEffect} from 'react';
import Head from '@components/head';
import Link from 'next/link';

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
    <div>
      <Head title="About" />
      <h1>So who is this Tom VanAntwerp person anyway?</h1>
      <p>Tom is a technologist living and working around Washington, DC. For roughly {Math.round(timeInMilliseconds/1000)} seconds (or about {Math.round(yearsFromMs(timeInMilliseconds) * 10) / 10} years) he's been designing and coding websites, creating interactive data visualizations, and building out IT infrastructure.</p>
      <p>To see some examples of Tom's work, check out <Link href="/projects" passHref><a>projects</a></Link>.</p>
      <p>To contact Tom, just yell really loud and maybe he'll hear you.</p>
    </div>
  );
}

export default About;