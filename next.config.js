/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "uat.ordering-iamthegardener-v5.ekbana.net",
      "assets.raptor.multiple.ekbana.net",
      "api.raptor.multiple.ekbana.net",
      "api.uat.ordering-pizzahut.ekbana.net",
      "assets.raptor.ekbana.net",
      "assets.uat.ordering-pizzahut.ekbana.net",
      "https://api.uat.ordering-pizzahut.ekbana.net/",
      "https://assets.uat.ordering-pizzahut.ekbana.net/",
    ],
  },

  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
        }),
      ];
    }
    // Important: return the modified config
    return config;
  },

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
