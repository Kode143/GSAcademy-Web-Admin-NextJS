// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'], // Add your Cloudinary hostname here
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: { transpileOnly: true },
    });
    return config;
  },
};
