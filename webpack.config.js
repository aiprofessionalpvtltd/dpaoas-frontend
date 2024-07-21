const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    // other plugins
  ],
  // ... other configurations
};
