const paths = require('./config').paths;

const devServer = {
  contentBase: paths.build,
  historyApiFallback: true,
  port: 3000,
  compress: true,
  inline: false,
  hot: false,
  host: '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: true,
  },
};

module.exports = {
  devServer,
};
