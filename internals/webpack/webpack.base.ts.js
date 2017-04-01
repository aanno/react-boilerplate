/**
 * COMMON WEBPACK CONFIGURATION
 */
// import * as path from "path"
// import * as webpack from "webpack"
// import * as log from "loglevel"
// import {gitInfoPromise} from "./gitinfo"

const path = require("path")
const webpack = require("webpack")
const log = require("loglevel")
const gitInfoPromise = require("./gitinfo")

// TODO tp:
log.setLevel(0 /* LogLevel.DEBUG */)

const jsLoader = (options) => {
  const result = {
    test: /\.(jsx?|tsx?)$/i, // Transform all .js files required somewhere with Babel
    use: [
      {
        loader: "babel-loader",
        query: options.babelQuery,
      },
      {
        loader: "awesome-typescript-loader",
        query: {
          // declaration: false,
        },
      },
    ],
    // loader: "ts-loader",
    include: /app/,
    exclude: /node_modules/,
  }
  if (options.reactHotLoader) {
    log.info("using react-hot-loader/webpack")
    result.use.unshift({
      loader: "react-hot-loader/webpack",
    })
  }
  log.info("jsLoader", JSON.stringify(result, null, 2))
  return result
}


const config = (options) => {
  return gitInfoPromise.then((gitInfo) => {
    return {
      entry: options.entry,
      output: Object.assign({ // Compile into js/build.js
        path: path.resolve(process.cwd(), "build"),
        publicPath: "./",
      }, options.output), // Merge with env dependent settings
      module: {
        rules: [
          jsLoader(options),
          {
            // Do not transform vendor"s CSS with CSS-modules
            // The point is that they remain in global scope.
            // Since we require these CSS files in our JS or CSS files,
            // they will be a part of our compilation either way.
            // So, no need for ExtractTextPlugin here.
            test: /\.css$/,
            include: /node_modules/,
            loaders: ["style-loader", "css-loader"],
          }, {
            // Enable Sass: https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/css/sass.md
            test: /\.scss$i/,
            exclude: /node_modules/,
            loaders: ["style-loader", "css-loader", "sass-loader"],
          }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: "file-loader",
          }, {
            test: /\.(jpg|png|gif)$/,
            loaders: [
              "file-loader",
              {
                loader: "image-webpack-loader",
                query: {
                  // progressive: true,
                  // optimizationLevel: 7,
                  // interlaced: false,
                  mozjpeg: {
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: true,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  // pngquant.exe fails -> commented out
                  // TODO: check and fix
                  // pngquant: {
                  //   quality: "65-90",
                  //   speed: 4,
                  // },
                },
              },
            ],
          }, {
            test: /\.html$/,
            loader: "html-loader",
          }, {
            test: /\.json$/,
            loader: "json-loader",
          }, {
            test: /\.(mp4|webm)$/,
            loader: "url-loader",
            query: {
              limit: 10000,
            },
          }],
      },
      plugins: options.plugins.concat([
        new webpack.ProvidePlugin({
          // make fetch available
          fetch: "exports-loader?self.fetch!whatwg-fetch",
        }),

        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          },
          "process.env.__DATE__": JSON.stringify(new Date()),
          "process.env.__GIT__": JSON.stringify(gitInfo),
        }),
        new webpack.NamedModulesPlugin(),
      ]),
      resolve: {
        modules: ["app", "node_modules"],
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".react.js",
        ],
        mainFields: [
          "browser",
          "jsnext:main",
          "main",
        ],
      },
      devtool: options.devtool,
      target: "web", // Make web variables accessible to webpack, e.g. window
      performance: options.performance || {},
    }
  })
}

module.exports = config
