const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
 
module.exports = {
  entry: {
    ["getProductsList"]: "./src/lambdas/getProductsList/index.ts",
    ["getProductId"]: "./src/lambdas/getProductId/index.ts",
		["createProduct"]: "./src/lambdas/createProduct/index.ts",
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/index.js",
    library: {
      type: "commonjs",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  watchOptions:{
    ignored: '**/test',
  } 
};