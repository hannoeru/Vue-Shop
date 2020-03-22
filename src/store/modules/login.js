import axiosBase from 'axios'
import router from '../../router'
import { Notify } from 'quasar'
const axios = axiosBase.create({
  baseURL: process.env.VUE_APP_API_PATH,
  withCredentials: true
})
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
      if (res.data.success) {
        commit('saveLoginState', true)
        commit('updateUsername', '')
        commit('updatePassword', '')
        router.push('/admin')
      }
      Notify.create({
        type: res.data.success ? 'positive' : 'negative',
        message: res.data.message
      })
    })
  },
  async signout({ commit }) {
    await axios.post('logout').then(res => {
      console.log(res.data)
      commit('updateMessage', res.data.message)
      if (res.data.success) {
        commit('saveLoginState', false)
        router.push('/login')
      }
    })
  },
  async checkLogin({ commit }) {
    await axios.post('api/user/check').then(res => {
      commit('saveLoginState', res.data.success)
      return res.data.success
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
  },
  updateMessage(state, message) {
    state.message = message
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
