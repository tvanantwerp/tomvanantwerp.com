/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const path = require('path');

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allMarkdownRemark {
//           edges {
//             node {
//               frontmatter {
//                 path
//               }
//             }
//           }
//         }
//       }
//     `).then(res => {
//       if (res.errors) {
//         return reject(res.errors);
//       }

//       res.data.allMarkdownRemark.edges.forEach(({ node }) => {
//         createPage({
//           path: `/${node.frontmatter.path}`,
//           component: path.resolve('./src/components/layout.js'),
//           context: {
//             path: node.frontmatter.path,
//           },
//         });
//       });
//       resolve();
//     });
//   });
// };
