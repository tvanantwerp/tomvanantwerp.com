import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from './layout';
import { Heading1 } from './Headings';

const PostContainer = styled.div`
  display: grid;
  min-height: 100vh;
  place-content: stretch;
`;

const Post = styled.div`
  background-color: #fff;
  color: #333;
  margin: 1rem;
  padding: 2rem;
  width: 100%;
`;

const PostLayout = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <PostContainer>
        <Post>
          <Heading1>{frontmatter.title}</Heading1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
