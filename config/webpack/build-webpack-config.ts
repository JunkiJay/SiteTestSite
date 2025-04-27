import { Configuration } from 'webpack';
import { BuildOptions } from './types';
import { buildLoaders } from './build-loaders';
import { buildDevServer } from './build-dev-server';
import { buildPlugins } from './build-plugins';
import path from 'path';

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
  const { paths, mode } = options;
  const isDev = mode === 'development';

  const config: Configuration = {
    mode: isDev ? 'development' : 'production',
    entry: paths.entry,
    devtool: isDev && 'eval-cheap-module-source-map',
    output: {
      filename: `assets/js/[name].[contenthash].js`,
      path: paths.dist,
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@src': paths.src,
        '@shared': path.join(paths.src, 'shared'),
        '@entities': path.join(paths.src, 'entities'),
        '@widgets': path.join(paths.src, 'widgets'),
        '@features': path.join(paths.src, 'features'),
        '@pages': path.join(paths.src, 'pages'),
        '@app': path.join(paths.src, 'app'),
      },
    },
    plugins: buildPlugins(options),
  };

  if (isDev) {
    config.devServer = buildDevServer(options);
  }

  return config;
};
