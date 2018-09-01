const { resolve } = require(`path`)

module.exports = {
  mode: `production`,
  entry: `./src/index.js`,
  target: `node`,
  externals: [
    `joi`,
    `joi-postalcode`,
    `graphql`
  ],
  devtool: `nosources-source-map`,
  output: {
    path: resolve(__dirname, `dist`),
    libraryTarget: `commonjs2`,
    filename: `index.js`,
    sourceMapFilename: `index.map`
  },
  module: {
    rules: [{ test: /\.js$/, loader: `babel-loader`, exclude: /node_modules/ }]
  }
}
