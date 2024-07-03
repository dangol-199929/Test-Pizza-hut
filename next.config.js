/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.uat.ordering-pizzahut.ekbana.net",
      "assets.uat.pizzahut.com.np",
    ],
  },

  // webpack: (config, { isServer, webpack }) => {
  //   if (isServer) {
  //     config.plugins = [
  //       ...config.plugins,
  //       new webpack.DefinePlugin({
  //         __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
  //       }),
  //     ];
  //   }
  //   // Important: return the modified config
  //   return config;
  // },

  // webpack: (config, { dev, isServer }) => {
  //   if (!dev) {
  //     // Disable HMR for production
  //     config.optimization.removeAvailableModules = true;
  //     config.optimization.removeEmptyChunks = true;
  //     config.optimization.splitChunks = {
  //       chunks: "all",
  //       name: false,
  //     };
  //   }
  //   return config;
  // },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
