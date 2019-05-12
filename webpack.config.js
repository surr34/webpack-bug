const path = require("path"),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {  // eslint-disable-line max-lines-per-function
  const PROD = argv.mode === "production";

  return {
    "devtool": false,
    "entry": {
      "index": path.resolve(__dirname, "index.jsx")
    },
    "module": {
      "rules": [
        {
          "exclude": /node_modules/u,
          "test": /\.jsx?$/u,
          "use": [
            {
              "loader": "babel-loader",
              "options": {
                "plugins": [],
                "presets": ["@babel/preset-react"]
              }
            }
          ]
        }
      ]
    },
    "optimization": {
      "minimizer": [new TerserPlugin({
        "terserOptions": {
          "output": {
            "comments": false
          },
          "mangle": false
        }
      })],
      "runtimeChunk": {
        "name": "vendors"
      },
      "splitChunks": {
        "cacheGroups": {
          "react": {
            "enforce": true,
            "chunks": "all",
            "name": "react",
            "test": /[\\/]node_modules[\\/](react|react-dom)[\\/]/u
          },
          "vendors": {
            "enforce": true,
            "chunks": "all",
            "name": "vendors",
            "priority": -10,
            "test": /[\\/]node_modules[\\/]/u
          }
        }
      }
    },
    "output": {
      "filename": `[name].${argv.mode}.js`,
      "libraryTarget": "umd",
      "path": path.resolve(__dirname, "dist")
    },
    "plugins": [
      new CleanWebpackPlugin()
    ],
    "resolve": {
      "extensions": [".cjs", ".js", ".json", ".jsx", ".mjs"]
    },
    "target": "web"
  };
};