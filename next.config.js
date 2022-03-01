/* eslint-disable @typescript-eslint/no-var-requires */

const nextBuildId = require('next-build-id');

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  swcMinify: false,
  // trailingSlash: true,
  reactStrictMode: true,
  optimizeFonts: true,
  webpack5: true,
  webpack: (config, { webpack, buildId, isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // custom aliases
      };
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
    }

    console.log('NEXT_CONFIG_BUILD_ID', buildId);

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_CONFIG_BUILD_ID': JSON.stringify(buildId),
      })
    );

    return config;
  },
});
