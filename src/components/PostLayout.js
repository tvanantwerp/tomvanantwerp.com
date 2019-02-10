import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from './layout';
import { Heading1 } from './Headings';

const PostLayout = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Heading1>{frontmatter.title}</Heading1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

PostLayout.propTypes = {
  children: PropTypes.node.isRequired,
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
