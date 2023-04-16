import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: {
    dev: path.join(__dirname, './dev.tsx'),
  },
  output: {
    path: path.join(__dirname, '../dist/views'), // path to /dist/views
    filename: '[name]-bundle.js',
  },
  plugins: [
    ...['dev'].map((entry) => {
      return new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        template: path.join(__dirname, './template.html'),
        chunks: [entry],
      });
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts, .tsx
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    proxy: {
      '/api/**': 'http://localhost:8000',
    },
    port: 3000,
    open: ['./dev.html'],
  },
};

export default config;
