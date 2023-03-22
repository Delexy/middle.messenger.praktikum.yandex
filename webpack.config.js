const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "/src/pages/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index-[contenthash:8].js",
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "index.html"),
      filename: "index.html",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "@webdiscus/pug-loader",
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
    ],
  },
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 1234,
  },
};
