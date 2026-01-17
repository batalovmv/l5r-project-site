/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Для GitHub Pages - указываем basePath если репо не username.github.io
  basePath: process.env.NODE_ENV === 'production' ? '/l5r-project-site' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/l5r-project-site/' : '',
};

export default nextConfig;

