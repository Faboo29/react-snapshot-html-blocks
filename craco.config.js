const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function ({ env }) {
  const isEnvProduction = env === 'production';
  const isEnvDevelopment = env === 'development';
  const indexTemplate = isEnvProduction ? 'prod-index.html' : 'index.html';
  const indexPath = path.resolve('public', indexTemplate);

  return {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    webpack: {
      alias: {},
      plugins: [],
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.optimization.splitChunks = {
          cacheGroups: {
            default: false,
          },
        };
        webpackConfig.optimization.runtimeChunk = false;
        webpackConfig.output.filename = 'app.js';

        webpackConfig.plugins.forEach((plugin) => {
          if (plugin instanceof HtmlWebpackPlugin) {
            plugin.options.template = indexPath;
            plugin.options.inject = true;
            plugin.options.filename = 'index.html';
          }

          if (plugin instanceof MiniCssExtractPlugin) {
            plugin.options.filename = '[name].css';
          }
        });

        return webpackConfig;
      },
    },
  };
};
