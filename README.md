# 官方文档

官方文档请查看 [http://doc.ssr-fc.com/](http://doc.ssr-fc.com/)

## unhead的webpack配置好像还有问题，待解决，vite的没有任何问题可以使用vite，也可以用其他替换unhead的方案，配置和使用方法是一样的
## 需要配置的地方全局搜索 unhead

```bash
$ npm start:vite # 本地开发模式运行，单进程 支持 前端 HMR 前端静态资源走本地 webpack 服务
$ npm run prod # 模拟生产环境运行，多进程，前端资源走静态目录
$ npm run stop # 生产环境停止服务
```