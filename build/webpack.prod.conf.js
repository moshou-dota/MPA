const Config = require('../config')
const Utils = require('./util')
const Merge = require('webpack-merge')
const Webpack = require('webpack')
const BaseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");

const Env = require('../config/prod.env')

const WebpackConfig = Merge(BaseWebpackConfig, {
  mode: 'production',
  module: {
    rules: Utils.styleLoaders({ sourceMap: Config.build.productionSourceMap, usePostCss: true, extract: true })
  },
  devtool: Config.build.productionSourceMap ? Config.build.devtool : false,
  output: {
    path: Config.build.assetsRoot,
    filename: Utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: Utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': Env
    }),
    new MiniCssExtractPlugin({
      filename: Utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: false,
    }),
    // css代码压缩
    new OptimizeCSSPlugin({
      cssProcessorOptions: Config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,  //测试匹配文件,
        // include: /\/includes/, //包含哪些文件
        // excluce: /\/excludes/, //不包含哪些文件

        //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
        //返回true以uglify块，否则返回false。
        // chunkFilter: (chunk) => {
        //   // `vendor` 模块不压缩
        //   if (chunk.name === 'vendor') {
        //     return false;
        //   }
        //   return true;
        // },
        sourceMap: Config.build.productionSourceMap,
        cache: false,   //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
        parallel: false,  //使用多进程并行运行来提高构建速度
      }),
    ],
    splitChunks: {
      chunks: "all", // 选择分割哪些代码块，可选值有: 'all'（所有代码块），'async'（按需加载的代码块），'initial'（初始化代码块）
      minSize: 30000, // 模块的最小体积
      minChunks: 2, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: { // 缓存组
        vendor: { // 抽离第三方插件
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          name: 'vendor', // 打包后的文件名，任意命名
          priority: -10, // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          reuseExistingChunk: true
        },
        common: { // 抽离自己写的公共代码，common这个名字可以随意起
          name: 'common', // 任意命名
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: {
    hints: 'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
})

// 是否对文件压缩
if (Config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  WebpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        Config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = WebpackConfig
