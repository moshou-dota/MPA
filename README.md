# MPA
多页面webpack配置demo

## 要点
1. 和SPA单页面配置相比，MPA的主要区别在于 entry 和 html-webpack-plugin 的配置
2.   webpack-dev-server打包之后的dist文件夹我们是看不见的，是打包在内存中的（也是为了快），硬盘中是看不到的，他会默认打开打包根目录的index.html文件，如果没有则提示 404, 所以要对打包后文件的目录结构要有清晰的认知，可以通过 npm run build 的命令看下打包好的目录结构，然后再通过修改相应的请求url找到对应的文件，主要开发环境和生产环境的打包目录的区别
ps：可以更用更简单的方式查看生成在内存中的各资源地址：http://localhost:8080/webpack-dev-server

## 后续优化
1. 如何直接打开首页
`
  // 这里我的目的是用于多页面，首页地址的重定向
  // 在devServer中添加如下配置
  historyApiFallback: {
    rewrites: [
      {
        from: /^\/.*/,
        to: function (context) {
          return `/html/${context.parsedUrl.pathname}`
        }
      },
    ]
  }
`
2. 理清output，devServer 中的 publicPath，contbase等配置的意思
output.publicPath: 用于修改静态资源URL，主要是给url-loader, mini-css-extract-plugin等这些分离的静态资源的URL作为参考，
如可以设置为相对于HTML文件的路径，相对于服务器的绝对路径等
devServer.publicPath: 作用类似于 output.publicPath，只不过其作用范围只针对webpack-dev-server，优先级高于 contbase
devServer.contentbase: 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
