import axiosBase from 'axios'
import { Notify } from 'quasar'

const axios = axiosBase.create({
  baseURL: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin`,
  withCredentials: true
})

const state = {
  products: [],
  orders: [],
  coupons: [],
  drawer: true,
  title: '後台管理',
  loadings: {
    products: false,
    update: false,
    delete: false,
    uploading: false,
    orders: false,
    coupons: false
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
      link: '/admin/products'
    }
  ],
  headers: {
    products: [
      {
        name: 'start',
        label: '分類',
        align: 'left',
        field: row => row.category,
        format: val => `${val}`,
        sortable: false
      },
      { name: 'title', label: '名稱', field: 'title' },
      {
        name: 'origin_price',
        label: '原價',
        align: 'right',
        field: 'origin_price',
        sortable: true
      },
      {
        name: 'price',
        label: '售價',
        align: 'right',
        field: 'price',
        sortable: true
      },
      { name: 'is_enabled', label: '是否啟用', field: 'is_enabled' },
      {
        name: 'edit',
        label: '編輯',
        align: 'center',
        field: 'edit',
        style: 'width: 200px'
      }
    ],
    orders: [
      {
        name: 'time',
        label: '購買時間',
        align: 'left',
        field: 'create_at',
        sortable: true
      },
      {
        name: 'email',
        label: 'Email',
        align: 'left',
        field: 'user'
      },
      {
        name: 'item',
        label: '購買款項',
        align: 'left'
      },
      {
        name: 'total',
        label: '應付金額',
        align: 'left',
        field: 'total',
        sortable: true
      },
      {
        name: 'paid',
        label: '是否付款',
        align: 'left',
        field: 'is_paid',
        sortable: true
      }
    ]
  }
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
  async getCoupons({ commit }, page = 1) {
    commit('updateLoading', ['coupons', true])
    await axios.get('coupons' + page).then(res => {
      if (res.data.success) {
        commit('updateCoupons', res.data.coupons)
      }
      commit('updateLoading', ['coupons', false])
    })
  },
  async updateProduct({ dispatch, commit }, { isNew, product }) {
    commit('updateLoading', ['update', isNew ? 'new' : product.id])
    const url = isNew ? 'product' : 'product/' + product.id
    const httpMethod = isNew ? 'post' : 'put'
    const data = { data: product }
    await axios[httpMethod](url, data).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getProducts')
      }
      commit('updateLoading', ['update', null])
    })
  },
  async deleteProduct({ dispatch, commit }, product) {
    commit('updateLoading', ['delete', product.id])
    let url = 'product/' + product.id
    await axios.delete(url).then(res => {
      notify(res.data)
      if (res.data.success) {
        dispatch('getProducts')
      }
      commit('updateLoading', ['delete', null])
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
