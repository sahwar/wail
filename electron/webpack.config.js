var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var path = require('path')


module.exports = {
   context: path.join(__dirname, "src"),
   entry: "./main.js",
   module: {
      noParse: /node_modules\/json-schema\/lib\/validate\.js/,
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
               presets: ['react', 'es2015', 'stage-0', 'node6', "react-hmre"],
               plugins: ['react-html-attrs', 'transform-class-properties',
                  'transform-runtime', "add-module-exports"],
            },
         },
         {test: /\.css$/, loader: "style!css"},
         {
            test: /(\.scss|\.css)$/,
            loader: 'style!css!less|scss'
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
            loader: 'url-loader?limit=10000',
         }, {
            test: /\.json$/,
            loader: 'json-loader',
         }, {
            test: /\.(eot|ttf|wav|mp3|tex)$/,
            loader: 'file-loader',
         },
         // {test: /\.tsx?$/, loader: 'webpack-typescript?target=ES6'},
      ]

   },

   plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
         __DEV__: true,
         'process.env': {
            NODE_ENV: JSON.stringify('development'),
         }
      }),
   ],
   output: {
      path: __dirname,
      filename: "main.js",
      publicPath: 'http://localhost:9000/'
   },
   target: 'electron-renderer',

};