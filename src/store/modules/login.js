import axios from 'axios'
import router from '../../router'
axios.defaults.baseURL = process.env.VUE_APP_API_PATH
const state = {
  user: { username: '', password: '' },
  isLogin: false,
  message: ''
}

const getters = {}

const actions = {
  async signin({ commit }) {
    await axios.post('admin/signin', state.user).then(res => {
      console.log(res.data)
      commit('saveLoginState', res.data.success)
      if (res.data.success) {
        commit('saveLoginState', true)
        router.push('/admin')
      }
    })
  },
  async signout({ commit }) {
    await axios.post('logout').then(res => {
      console.log(res.data)
      if (res.data.success) {
        commit('saveLoginState', false)
        router.push('/login')
      }
    })
  },
  async checkLogin({ commit }) {
    await axios.post('api/user/check').then(res => {
      commit('saveLoginState', res.data.success)
    })
  }
}
const mutations = {
  updateUsername(state, message) {
    state.user.username = message
  },
  updatePassword(state, message) {
    state.user.password = message
  },
  saveLoginState(state, message) {
    state.isLogin = message
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
