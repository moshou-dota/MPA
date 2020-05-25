const Utils = require('./util')
const Config = require('../config')
const Merge = require('webpack-merge')
const Webpack = require('webpack')
const BaseWebpackConfig = require('./webpack.base.conf.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 有好的错误提示组件
const portfinder = require('portfinder') // 用于当设置端口被占用是，自动获取其他端口启动服务

const Env = require('../config/dev.env')

const HOST = process.env.HOST
const PORT = process.env.PORT

const DevWebpackConfig = Merge(BaseWebpackConfig, {
  mode: 'development',
  module: {
    rules: Utils.styleLoaders({ sourceMap: Config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: Config.dev.devtool,
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': Env
    }),
    new Webpack.NamedModulesPlugin(), // 以便更容易查看要修补(patch)的依赖
    new Webpack.HotModuleReplacementPlugin()
  ],
  /** 众所周知，webpack-dev-server 执行后完全没必要用webpack，只有打包上线的时候会用到这一命令，
   * 但是webpack-dev-server打包之后的dist文件夹我们是看不见的，是打包在内存中的（也是为了快），
   * 硬盘中是看不到的，如果你有个index.html，它会自动打开index.html，
   * 我这个项目没有在根目录下设置index.html，所以它执行到
   **/
  devServer: {
    hot: true,
    overlay: true,//出现错误之后会在页面中出现遮罩层提示
    host: HOST || Config.dev.host || '127.0.0.1',
    port: PORT || Config.dev.post || '8080', //默认是8080
    open: Config.dev.autoOpenBrowser,
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    publicPath: '/', // devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先，默认值：/。优先级高于contentBase
    // contentBase: './html', //contentBase 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
    // historyApiFallback: true,//true默认打开index.html，false会出现一个目录，一会演示
    // historyApiFallback: { // 这里我的目的是用于多页面，首页地址的重定向
    //   rewrites: [
    //     {
    //       from: /^\/.*/,
    //       to: function (context) {
    //         return `/html/${context.parsedUrl.pathname}`
    //       }
    //     },
    //   ]
    // },
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = DevWebpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port // publish the new Port, necessary for e2e tests
      DevWebpackConfig.devServer.port = port

      DevWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${DevWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: undefined
      }))

      resolve(DevWebpackConfig)
    }
  })
})

