module.exports = {
  siteMetadata: {
    title: 'Tom VanAntwerp',
    description: 'Personal Website of Tom VanAntwerp',
    keywords: 'Tom VanAntwerp',
    externalLinks: [
      { name: 'Twitter', url: 'https://twitter.com/tvanantwerp' },
      { name: 'Github', url: 'https://github.com/tvanantwerp' },
      { name: 'Dribbble', url: 'https://dribbble.com/tvanantwerp' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/tvanantwerp/' },
    ],
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'tomvanantwerp.com',
        short_name: 'tomvanantwerp.com',
        start_url: '/',
        background_color: '#f9ad8a',
        theme_color: '#f1696f',
        display: 'minimal-ui',
        icon: 'src/images/tom.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'work',
        path: `${__dirname}/src/content/work`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
