import { BuildOptions } from './types';
import { Configuration } from 'webpack-dev-server';
import * as fs from 'fs';
import path from 'path';

export const buildDevServer = ({ devServerPort, paths }: BuildOptions): Configuration => {
  return {
    port: devServerPort || '443',
    allowedHosts: 'tg-mini-app.local',
    server: {
      type: 'https',
      options: {
        cert: fs.readFileSync(path.join(paths.root, '.cert', 'localhost.pem')),
        key: fs.readFileSync(path.join(paths.root, '.cert', 'localhost-key.pem')),
      },
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
    hot: true,
  };
};
