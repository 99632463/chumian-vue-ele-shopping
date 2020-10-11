module.exports = {
  devServer: {
    open: true,
    https: false,
    proxy:{
      '/admin':{
        target: 'http://ceshi5.dishait.cn',
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}