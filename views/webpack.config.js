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
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    port: 3000,
    open: true,
  },
};

export default config;
