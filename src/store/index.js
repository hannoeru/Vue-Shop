import Vue from 'vue'
import Vuex from 'vuex'
// Admin
import login from './modules/login'
import admin from './modules/admin'
import front from './modules/front'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: { login, admin, front },
  strict: debug
})
