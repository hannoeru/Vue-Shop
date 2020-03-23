import axiosBase from 'axios'
import { Notify } from 'quasar'
import headers from '../headers'

const axios = axiosBase.create({
  baseURL: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin`,
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
  orders: [],
  coupons: [],
  drawer: true,
  title: '後台管理',
  loadings: {
    products: false,
    productUpdate: null,
    productDelete: null,
    uploading: false,
    orders: false,
    coupons: false,
    couponUpdate: null,
    couponDelete: null
  },
  pagination: {
    products: {},
    orders: {}
  },
  tablePage: {
    rowsPerPage: 10
  },
  tempProducts: {},
  separator: 'horizontal',
  menuList: [
    {
      icon: 'fas fa-home',
      iconColor: 'dark',
      label: '回首頁',
      separator: true,
      link: '/'
    },
    {
      icon: 'fas fa-boxes',
      iconColor: 'secondary',
      label: '商品列表',
      separator: false,
      link: '/admin'
    },
    {
      icon: 'fas fa-list-alt',
      iconColor: 'accent',
      label: '訂單列表',
      separator: false,
      link: '/admin/orders'
    },
    {
      icon: 'fas fa-ticket-alt',
      iconColor: 'warning',
      label: '優惠卷',
      separator: true,
      link: '/admin/coupons'
    },
    {
      icon: 'fas fa-shopping-bag',
      iconColor: 'dark',
      label: '模擬訂單',
      separator: false,
      link: '/customer_order'
    }
  ],
  headers: headers
}

const getters = {
  sortOrder: state => {
    const orders = [...state.orders]
    let newOrder = []
    if (orders.length) {
      newOrder = orders.sort((a, b) => {
        const aIsPaid = a.is_paid ? 1 : 0
        const bIsPaid = b.is_paid ? 1 : 0
        return bIsPaid - aIsPaid
      })
    }
    return newOrder
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
  async getOrders({ commit }, page = 1) {
    commit('updateLoading', ['orders', true])
    await axios.get('orders?page=' + page).then(res => {
      if (res.data.success) {
        commit('updateOrders', res.data.orders)
        commit('updatePagination', [res.data.pagination, 'orders'])
      }
      commit('updateLoading', ['orders', false])
    })
  },
  async getCoupons({ commit }) {
    commit('updateLoading', ['coupons', true])
    await axios.get('coupons').then(res => {
      if (res.data.success) {
        commit('updateCoupons', res.data.coupons)
      }
      commit('updateLoading', ['coupons', false])
    })
  },
  async updateProduct({ dispatch, commit }, { isNew, product }) {
    commit('updateLoading', ['productUpdate', isNew ? 'new' : product.id])
    const url = isNew ? 'product' : 'product/' + product.id
    const httpMethod = isNew ? 'post' : 'put'
    const data = { data: product }
    await axios[httpMethod](url, data).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getProducts')
      }
      commit('updateLoading', ['productUpdate', null])
    })
  },
  async updateCoupon({ dispatch, commit }, { isNew, coupon }) {
    commit('updateLoading', ['couponUpdate', isNew ? 'new' : coupon.id])
    const url = isNew ? 'coupon' : 'coupon/' + coupon.id
    const httpMethod = isNew ? 'post' : 'put'
    const data = { data: coupon }
    await axios[httpMethod](url, data).then(res => {
      notify(res.data)
      console.log(coupon)
      if (res.data.success) {
        dispatch('getCoupons')
      }
      commit('updateLoading', ['couponUpdate', null])
    })
  },
  async deleteProduct({ dispatch, commit }, id) {
    commit('updateLoading', ['productDelete', id])
    let url = 'product/' + id
    await axios.delete(url).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getProducts')
      }
      commit('updateLoading', ['productDelete', null])
    })
  },
  async deleteCoupon({ dispatch, commit }, id) {
    commit('updateLoading', ['couponDelete', id])
    let url = 'coupon/' + id
    await axios.delete(url).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getCoupons')
      }
      commit('updateLoading', ['couponDelete', null])
    })
  },
  async uploadFile({ commit }, file) {
    commit('updateLoading', ['uploading', true])
    let imageUrl = null
    const formData = new FormData()
    formData.append('file-to-upload', file)
    await axios
      .post('upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        notify(res.data, true)
        if (res.data.success) {
          commit('updateLoading', ['uploading', false])
          imageUrl = res.data.imageUrl
        }
      })
    return await imageUrl
  }
}

const mutations = {
  updateDrawer(state, value) {
    state.drawer = value
  },
  updateProducts(state, products) {
    state.products = products
  },
  updateOrders(state, orders) {
    state.orders = orders
  },
  updateCoupons(state, coupons) {
    state.coupons = coupons
  },
  updateLoading(state, [which, value]) {
    state.loadings[which] = value
  },
  updateTempProduct(state, value) {
    state.tempProducts = value
  },
  updatePagination(state, [value, location]) {
    state.pagination[location] = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
