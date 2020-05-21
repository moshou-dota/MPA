const Path = require('path')

module.exports = {
  dev: {
    assetsPublicPath: '',
    assetsSubDirectory: '',

    showEslintErrorsInOverlay: false,
    useEslint: true,

    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,

    devtool: 'eval-source-map',

    cssSourceMap: false,
  },
  build: {
    index: Path.resolve(__dirname, '../dist/index.html'),

    assetsRoot: Path.resolve(__dirname, '../dist'),
    assetsPublicPath: '',
    assetsSubDirectory: 'assets',

    devtool: '#source-map',

    productionSourceMap: true,

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
}
