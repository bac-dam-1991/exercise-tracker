const path = require("path");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    path: path.join(__dirname, "src", "index.ts"),
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
  module: {
    rules: [
      { test: /\.js$/, use: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.ts$/, use: ["ts-loader"], exclude: /node_modules/ },
    ],
  },
};
