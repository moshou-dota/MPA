# MPA
多页面webpack配置demo

## 要点
1. 和SPA单页面配置相比，MPA的主要区别在于 entry 和 html-webpack-plugin 的配置
2.   webpack-dev-server打包之后的dist文件夹我们是看不见的，是打包在内存中的（也是为了快），硬盘中是看不到的，他会默认打开打包根目录的index.html文件，如果没有则提示 404, 所以要对打包后文件的目录结构要有清晰的认知，可以通过 npm run build 的命令看下打包好的目录结构，然后再通过修改相应的请求url找到对应的文件，主要开发环境和生产环境的打包目录的区别

## 后续优化
1. 如何直接打开首页
2. 理清output，devServer 中的 publichPath，contbase等配置的意思
