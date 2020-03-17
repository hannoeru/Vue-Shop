import Vue from 'vue'
import Vuex from 'vuex'
// Admin
import adminProducts from './modules/Admin/products.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: { adminProducts },
  strict: debug
})
