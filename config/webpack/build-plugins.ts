import { BuildOptions } from './types';
import webpack, { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export const buildPlugins = ({ mode, paths, analyzer }: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';
  const isNotMockedApi = process.env.MODE === 'production';

  const publicIgnoredFiles = ['**/index.html'];
  if (isNotMockedApi) {
    publicIgnoredFiles.push('**/mockServiceWorker.js');
  }

  const plugins: Configuration['plugins'] = [
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.dist,
          globOptions: { ignore: publicIgnoredFiles },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'env.__MODE__': JSON.stringify(process.env.MODE),
      'env.__API_URL__': JSON.stringify(process.env.API_URL),
      'env.__TON_CONNECT_MANIFEST_URL__': JSON.stringify(process.env.TON_CONNECT_MANIFEST_URL),
      'env.__BASE_APP_URL__': JSON.stringify(process.env.BASE_APP_URL),
      'env.__ENABLE_WEB__': JSON.stringify(process.env.ENABLE_WEB ?? 'false'),
      'env.__BOT_NAME__': JSON.stringify(process.env.BOT_NAME),
      'env.__TELEGRAM_MINI_APP_NAME__': JSON.stringify(process.env.TELEGRAM_MINI_APP_NAME),
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
      }),
    );
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
