/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push({
  //     test: /supabase/i,
  //     loader: "ignore-loader",
  //   });
  //   return config;
  // },
};

module.exports = nextConfig;
