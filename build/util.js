const Path = require('path')
const Config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.cssLoaders = function (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS? [cssLoader, postcssLoader]: [cssLoader]
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return [{
        loader: MiniCssExtractPlugin.loader
      }].concat(loaders)
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for(let key in loaders) {
    let loader = loaders[key]
    output.push({
      test: new RegExp(`\\.${key}$`),
      use: loader
    })
  }
  return output
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? Config.build.assetsSubDirectory
    : Config.dev.assetsSubDirectory

  return Path.posix.join(assetsSubDirectory, _path)
}
