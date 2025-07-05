import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',  
  entry: './client/src/main.js',  // Entry point for the application
  output: {
    path: path.resolve(__dirname, 'public'),  // Output directory for the bundle
    filename: 'bundle.js', // Output filename for the JavaScript bundle
    clean: true,  // Clean the output directory before each build
  },
  module: {
    rules: [ 
      {
        test: /\.css$/i,  // Process CSS files
        use: [
          MiniCssExtractPlugin.loader,  // Extract CSS into separate files
          "css-loader", // Translates CSS into CommonJS
        ],
      },
    ],
  },
  plugins: [ 
    new HtmlWebpackPlugin({  // Generate HTML file
      template: './client/index.html', // Template for the HTML file
      filename: 'index.html', // Output filename for the HTML file
    }),
    new MiniCssExtractPlugin({  // Extract CSS into separate files
      filename: 'bundle.css', // Output CSS file
    }),
  ],
};