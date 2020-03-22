import axiosBase from 'axios'
import { Notify } from 'quasar'

const axios = axiosBase.create({
  baseURL: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}`,
  withCredentials: true
})

const notify = function(data, isUpload = false) {
  const message = isUpload
    ? data.success
      ? '上傳成功'
      : '上傳失敗'
    : data.message
  Notify.create({
    type: data.success ? 'positive' : 'negative',
    message: message
  })
}

const state = {
  products: [],
  carts: [],
  pagination: {},
  loadings: {}
}

const getters = {
  selectOptions() {
    let options = []
    for (let i = 1; i < 10; i++) {
      options.push({
        label: '選購' + i + '件',
        value: i
      })
    }
    return options
  }
}

const actions = {
  async getProducts({ commit }, page = 1) {
    commit('updateLoading', ['products', true])
    await axios.get('products?page=' + page).then(res => {
      if (res.data.success) {
        commit('updateProducts', res.data.products)
        commit('updatePagination', [res.data.pagination, 'products'])
      }
      commit('updateLoading', ['products', false])
    })
  },
  async getProduct({ commit }, id) {
    commit('updateLoading', ['product', id])
    let product = {}
    await axios.get('product/' + id).then(res => {
      if (res.data.success) {
        product = res.data.product
      } else {
        notify(res.data)
      }
      commit('updateLoading', ['product', null])
    })
    return await product
  },
  async addToCart({ dispatch, commit }, [id, num = 1]) {
    commit('updateLoading', ['addToCart', id])
    const cart = {
      data: {
        product_id: id,
        qty: num
      }
    }
    await axios.post('cart', cart).then(res => {
      notify(res.data)
      dispatch('getCarts')
      commit('updateLoading', ['addToCart', null])
    })
  },
  async getCarts({ commit }) {
    commit('updateLoading', ['cart', true])
    await axios.get('cart').then(res => {
      if (res.data.success) {
        console.log(res.data)
        commit('updateCarts', res.data.data.carts)
      }
      commit('updateLoading', ['cart', false])
    })
  }
}

const mutations = {
  updateProducts(state, products) {
    state.products = products
  },
  updateLoading(state, [which, value]) {
    state.loadings[which] = value
  },
  updatePagination(state, [value, location]) {
    state.pagination[location] = value
  },
  updateCarts(state, carts) {
    state.carts = carts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
