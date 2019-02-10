import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Layout from './layout';
import { Heading1 } from './Headings';

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  place-content: stretch;
`;

const Post = styled.div`
  background-color: #fff;
  color: #333;
  margin: 1rem;
  padding: 2rem;
`;

const PostContent = styled.div`
  margin: 0 auto;
  max-width: 760px;
`;

const PostLayout = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Helmet
        title={frontmatter.title}
        meta={[
          { name: 'description', content: frontmatter.description },
          { name: 'keywords', content: frontmatter.keywords },
        ]}
      />
      <PostContainer>
        <Post>
          <PostContent>
            <Heading1>{frontmatter.title}</Heading1>
            <p style={{ textAlign: 'center' }}>{frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </PostContent>
        </Post>
      </PostContainer>
    </Layout>
  );
};

export default PostLayout;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
