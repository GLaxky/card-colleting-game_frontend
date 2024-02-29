const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV == 'development' ? './' : '/',
  devServer:{
    proxy:{
      "/apis": {
        // target: "http://172.31.14.32:8080/",
        // target: "http://47.103.75.231:8080/",
        target: 'http://localhost:8080/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/apis/, '')
        // rewrite:{
        //   '^/api':''
        // }
        pathRewrite: {
          "^/apis": "/CollectCards_war_exploded/"	//通配符
        }
      },
    }
  }
});
