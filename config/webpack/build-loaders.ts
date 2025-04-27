import { BuildOptions } from './types';
import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypesScript from 'react-refresh-typescript';

export const buildLoaders = ({ mode }: BuildOptions): ModuleOptions['rules'] => {
  const isDev = mode === 'development';

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypesScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: '/node_modules/',
  };

  const stylesLoader = {
    test: /\.(sa|sc|c)ss$/i,
    exclude: '/node_modules/',
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  };

  return [
    tsLoader,
    stylesLoader,

    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      exclude: '/node_modules/',
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      exclude: '/node_modules/',
      generator: {
        filename: `assets/fonts/[hash][ext][query]`,
      },
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      exclude: '/node_modules/',
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    },
  ];
};
