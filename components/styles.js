import { createGlobalStyle } from 'styled-components';
import {reset} from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  :root {
    --light-bg: #f5f5f5;
    --light-color: #21252B;
    --gray: #999;
    --dark-bg: #21252B;
    --dark-color: #eee;
    --max-width: 960px;

    --background-color: var(--light-bg);
    --color: var(--light-color);

    @media (prefers-color-scheme: dark) {
      --background-color: var(--dark-bg);
      --color: var(--dark-color);
    }
  }

  ${reset}

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, Oxygen-Sans, Ubuntu, Cantarell,
                "Helvetica Neue", sans-serif;
    font-size: 100%;
    margin: 0;
    padding: 0;

    background-color: var(--background-color);
    color: var(--color);
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h2 {
    border-bottom: 1px solid var(--color);
    font-size: 2rem;
    margin: 2rem 0;
    padding-bottom: 0.5rem;
    font-style: italic;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  h6 {
    font-weight: 700;
  }

  p {
    line-height: 1.4;
    margin: 1rem 0;
  }

  ul, ol {
    line-height: 1.4;
    margin: 1rem 0;
  }

  ul {
    list-style: circle;
  }

  ol {
    list-style: decimal-leading-zero;
  }

  li {
    margin-left: 1rem;
  }

  em {
    font-style: italic;
  }

  strong {
    font-style: bold;
  }

  a {
    color: inherit;
  }

  sub, sup {
    font-size: 0.7em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

  pre {
    line-height: 1.5em;
    margin: 1rem 0;
    max-width: 100%;
    overflow-x: auto;
    padding: 1rem;
    tab-size: 2;
    white-space: pre-wrap;
    word-break: normal;
    word-spacing: normal;
    word-wrap: break-word;
  }

  *:not(pre) > code {
    background: var(--background-color);
    border: 1px solid var(--gray);
    border-radius: 6px;
    color: var(--color);
    padding: 0.24rem 0.22rem 0.1rem;
  }

  code,
  pre {
    background: #263238;
    color: #c3cee3;
    font-family: monospace;
    font-size: 1rem;
    hyphens: none;
    text-align: left;
  }

  .language-css > code,
  .language-sass > code,
  .language-scss > code {
    color: #fd9170;
  }

  [class*='language-'] .namespace {
    opacity: 0.7;
  }

  .token.atrule {
    color: #c792ea;
  }

  .token.attr-name {
    color: #ffcb6b;
  }

  .token.attr-value {
    color: #c3e88d;
  }

  .token.attribute {
    color: #c3e88d;
  }

  .token.boolean {
    color: #c792ea;
  }

  .token.builtin {
    color: #ffcb6b;
  }

  .token.cdata {
    color: #80cbc4;
  }

  .token.char {
    color: #80cbc4;
  }

  .token.class {
    color: #ffcb6b;
  }

  .token.class-name {
    color: #f2ff00;
  }

  .token.color {
    color: #f2ff00;
  }

  .token.comment {
    color: #546e7a;
  }

  .token.constant {
    color: #c792ea;
  }

  .token.deleted {
    color: #f07178;
  }

  .token.doctype {
    color: #546e7a;
  }

  .token.entity {
    color: #f07178;
  }

  .token.function {
    color: #c792ea;
  }

  .token.hexcode {
    color: #f2ff00;
  }

  .token.id {
    color: #c792ea;
    font-weight: bold;
  }

  .token.important {
    color: #c792ea;
    font-weight: bold;
  }

  .token.inserted {
    color: #80cbc4;
  }

  .token.keyword {
    color: #c792ea;
    font-style: italic;
  }

  .token.number {
    color: #fd9170;
  }

  .token.operator {
    color: #89ddff;
  }

  .token.prolog {
    color: #546e7a;
  }

  .token.property {
    color: #80cbc4;
  }

  .token.pseudo-class {
    color: #c3e88d;
  }

  .token.pseudo-element {
    color: #c3e88d;
  }

  .token.punctuation {
    color: #89ddff;
  }

  .token.regex {
    color: #f2ff00;
  }

  .token.selector {
    color: #f07178;
  }

  .token.string {
    color: #c3e88d;
  }

  .token.symbol {
    color: #c792ea;
  }

  .token.tag {
    color: #f07178;
  }

  .token.unit {
    color: #f07178;
  }

  .token.url {
    color: #fd9170;
  }

  .token.variable {
    color: #f07178;
  }
`;

export default GlobalStyle;
