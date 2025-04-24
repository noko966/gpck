// webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/js/gpickr.js",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "gpickr.min.js",
      library: {
        name: "GPickr",
        type: "umd",
        export: "default",
      },
      globalObject: "this",
      clean: true,
    },

    devtool: isProd ? "source-map" : "source-map",

    devServer: {
      static: {
        directory: path.join(__dirname, "static"),
      },
      devMiddleware: {
        publicPath: "/dist/",
      },
      host: "0.0.0.0",
      port: 3007,
      hot: true,
      open: true,
      client: {
        overlay: true,
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(scss|css)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },

    optimization: {
      minimize: isProd,
      minimizer: ["...", new CssMinimizerPlugin()],
    },

    plugins: [new MiniCssExtractPlugin({ filename: "gpickr.min.css" })],

    resolve: { extensions: [".js"] },
    target: ["web", "es2017"],
  };
};
