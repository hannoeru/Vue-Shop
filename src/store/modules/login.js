import axiosBase from 'axios';
import router from '../../router';
import { Notify } from 'quasar';
axiosBase.defaults.withCredentials = true;
const axios = axiosBase.create({
  baseURL: process.env.VUE_APP_API_PATH
});
const state = {
  user: { username: '', password: '' },
  isLogin: false,
  message: ''
};

const getters = {};

const actions = {
  async signin({ commit }) {
    await axios.post('admin/signin', state.user).then(res => {
      if (res.data.success) {
        commit('saveLoginState', true);
        commit('updateUsername', '');
        commit('updatePassword', '');
        router.push('/admin');
      }
      Notify.create({
        type: res.data.success ? 'positive' : 'negative',
        message: res.data.message
      });
    });
  },
  async signout({ commit }) {
    await axios.post('logout').then(res => {
      commit('updateMessage', res.data.message);
      if (res.data.success) {
        commit('saveLoginState', false);
        router.push('/login');
      }
    });
  },
  async checkLogin({ commit }) {
    let isLogin = false;
    await axios.post('api/user/check').then(res => {
      commit('saveLoginState', res.data.success);
      isLogin = res.data.success;
    });
    return await isLogin;
  }
};
const mutations = {
  updateUsername(state, message) {
    state.user.username = message;
  },
  updatePassword(state, message) {
    state.user.password = message;
  },
  saveLoginState(state, message) {
    state.isLogin = message;
  },
  updateMessage(state, message) {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
