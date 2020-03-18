import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import './quasar'
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    store.dispatch('login/checkLogin')
    if (!store.state.login.isLogin) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
