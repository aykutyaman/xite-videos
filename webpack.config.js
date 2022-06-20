const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        ...dotenv.config().parsed,
      }),
    }),
  ],
  devtool: "inline-source-map",
};
