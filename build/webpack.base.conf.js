const glob = require('glob')
const path = require('path')
const config = require('../config')
const utils = require('./util')
const htmlWebpackPlugin = require('html-webpack-plugin')
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

// 规范代码编写风格
const createLintRule = () => ({
  test: /\.js$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
    emitWarning: !config.dev.showEslintErrorsInOverlay  // 如果设置为 true，则总是返回警告
  }
})

// 获取所有的页面入口和配置相应的htmlWebpckPlugin
function fecthMPA () {
  let entry = {},
    htmlWebpackPlugins = [];
  const entryFiles = glob.sync(resolve('src/views/*/index.js'))

  entryFiles.forEach(file => {
    const match = file.match(/src\/views\/(\w+)\/index\.js$/)
    const pageName = match && match[1]

    entry[pageName] = file;

    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        title: pageName,
        template: resolve(`src/views/${pageName}/index.html`),
        filename: `html/${pageName}.html`,
        chunks: ['manifest', 'vendor', 'common', pageName],
        inject: true,
        // 设置HTML生位置，以及优化配置，如：去除注释
        minify: process.env.NODE_ENV === 'production' ? {
          html5: true,
          removeComments: false,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        } : false,
        chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none', 具体原因参考：https://www.jianshu.com/p/08a60756ffda
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = fecthMPA()

module.exports = {
  context: path.resolve(__dirname, '../'), // 配置上下文所在页面地址
  entry: entry,
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js', // 他让各自页面需要引用的 js 文件放在dist的js目录下
    publicPath: process.env.NODE_ENV === 'production' ? // 用于加载 按需加载或外部资源的内容
      config.build.assetsPublicPath : // 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析
      config.dev.assetsPublicPath // 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以/结束。
    // webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintRule()] : []),
      {
        // https://blog.csdn.net/weixin_36185028/article/details/81114827
        test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 图片文件输出的文件夹
          // publicPath: "/../",
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attributes: true,
            minimize: process.env.NODE_ENV === 'production'
          }
        }
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { // 将根目录static中的所有内容复制到dist/static目录下
          from: resolve('static/'),
          to: resolve('dist/static/[name].[ext]')
        }
      ]
    }),
    ...htmlWebpackPlugins
  ]
}
