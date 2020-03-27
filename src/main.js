import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import './quasar';
import './plugins/veeValidate';
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
// Install filter globally
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    if (store.dispatch('login/checkLogin')) {
      next({ path: '/admin' });
    } else {
      next();
    }
  }
  if (to.meta.requiresAuth) {
    if (store.dispatch('login/checkLogin')) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
