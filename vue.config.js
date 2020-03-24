module.exports = {
  transpileDependencies: ['quasar'],
  pages: {
    index: {
      entry: 'src/main.js',
      title: '網路點數專賣'
    }
  },
  publicPath: '/Vue-Shop/',
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
}
