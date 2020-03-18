import Vue from 'vue'
import Vuex from 'vuex'
// Admin
import login from './modules/login'
import admin from './modules/admin'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: { login, admin },
  strict: debug
})
