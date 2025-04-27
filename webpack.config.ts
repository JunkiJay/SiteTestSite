import path from 'path';
import { buildWebpackConfig } from './config/webpack/build-webpack-config';
import { BuildMode, BuildOptions } from './config/webpack/types';
import { config as dotenvConfig } from 'dotenv';

interface WebpackEnvs {
  port?: string;
  mode?: BuildMode;
  analyzer?: 'true' | 'false';
}

const paths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  public: path.resolve(__dirname, 'public'),
  root: path.resolve(__dirname),
};

export default ({ mode, port, analyzer }: WebpackEnvs) => {
  dotenvConfig({ path: `${paths.root}/.env.${mode}` });

  const options: BuildOptions = {
    devServerPort: port ?? '443',
    mode: mode ?? 'production',
    paths,
    analyzer: analyzer,
  };

  return buildWebpackConfig(options);
};
