const path = require("path")
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "",
  filenameHashing: false,
  assetsDir: 'static',
  outputDir: 'dist',
  devServer: {
    host: "0.0.0.0",
    port: "3000", //代理端口
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    disableHostCheck: true, //穿透 如果不配置，穿透不了
    proxy: {
      '.*': {
        target: "http://192.168.1.9:9023", //回头配置开发本地地址
        changeOrigin: true,
        ws: false
      }
    }
  },
  chainWebpack: config => { // 配置路径
    config.resolve.alias
      .set("@img", resolve("src/assets/img"))
      .set("@", resolve("src"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"))
      .set("@static", resolve("static"))
      .set("@css", resolve("src/assets/css"))
      .set("@public", resolve("public"))
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugins.delete('prefetch')
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
  },
  // 配置less
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: IS_PROD,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },

}