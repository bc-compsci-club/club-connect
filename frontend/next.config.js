const withPlugins = require('next-compose-plugins');
const images = require('next-images');
const mdx = require('@next/mdx')({
  extension: /\.mdx?$/,
});

// const nextConfig = {
//   distDir: 'build',
// };

const mdxConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

module.exports = withPlugins([images, [mdx, mdxConfig]]);
