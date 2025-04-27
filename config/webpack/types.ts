export type BuildMode = 'development' | 'production';

export interface BuildOptions {
  mode: BuildMode;
  devServerPort: string;
  paths: {
    entry: string;
    dist: string;
    public: string;
    src: string;
    root: string;
  };
  analyzer?: 'true' | 'false';
}
