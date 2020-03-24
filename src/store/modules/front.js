import axiosBase from 'axios'
import { Notify } from 'quasar'
import router from '../../router'

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
  title: '商城',
  products: [],
  cartData: {
    carts: {}
  },
  checkOrderInfo: true,
  order: {
    user: {}
  },
  pagination: {},
  loadings: {
    products: false,
    product: null,
    addToCart: null,
    cart: false,
    deleteCart: null,
    addCouponCode: false,
    createOrder: false,
    payOrder: false
  }
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
  async getAllProducts({ commit }) {
    commit('updateLoading', ['products', true])
    await axios.get('products/all').then(res => {
      if (res.data.success) {
        commit('updateProducts', res.data.products)
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
        commit('updateCartData', res.data.data)
      }
      commit('updateLoading', ['cart', false])
    })
  },
  async deleteCart({ dispatch, commit }, id) {
    commit('updateLoading', ['deleteCart', id])
    let url = 'cart/' + id
    await axios.delete(url).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getCarts')
      }
      commit('updateLoading', ['deleteCart', null])
    })
  },
  async addCouponCode({ dispatch, commit }, code) {
    commit('updateLoading', ['addCouponCode', true])
    const coupon = {
      data: { code: code }
    }
    await axios.post('coupon', coupon).then(res => {
      notify(res.data)
      dispatch('getCarts')
      commit('updateLoading', ['addCouponCode', false])
    })
  },
  async createOrder({ dispatch, commit }, order) {
    commit('updateLoading', ['createOrder', true])
    const data = { data: order }
    await axios.post('order', data).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getCarts')
        router.push('payment/' + res.data.orderId)
      }
      commit('updateLoading', ['createOrder', false])
    })
  },
  async getOrder({ commit }, id) {
    commit('updateLoading', ['getOrder', true])
    await axios.get('order/' + id).then(res => {
      if (res.data.success) {
        commit('updateOrder', res.data.order)
      }
      commit('updateLoading', ['getOrder', false])
    })
  },
  async payOrder({ dispatch, commit }, id) {
    commit('updateLoading', ['payOrder', true])
    await axios.post('pay/' + id).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getOrder', id)
      }
      commit('updateLoading', ['payOrder', false])
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
  updateCartData(state, cartData) {
    state.cartData = cartData
  },
  updateOrder(state, order) {
    state.order = order
  },
  checkOrderInfo(state, info) {
    state.checkOrderInfo = info
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
