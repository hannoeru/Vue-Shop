import axios from 'axios'
axios.defaults.baseURL = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin`

const state = {
  products: [],
  drawer: true,
  headers: [
    {
      text: '分類',
      align: 'start',
      sortable: false,
      value: 'category'
    },
    { text: '名稱', value: 'title' },
    { text: '原價', value: 'origin_price' },
    { text: '售價', value: 'price' },
    { text: '是否啟用', value: 'is_enabled' },
    { text: '編輯', value: 'edit' }
  ]
}

const getters = {}

const actions = {
  async getProducts({ commit }, page = 1) {
    await axios.get('products?page=' + page).then(res => {
      console.log(res.data)
      if (res.data.success) {
        commit('updateProducts', res.data.products)
        // router.push('/admin')
      }
    })
  }
}

const mutations = {
  updateDrawer(state, value) {
    state.drawer = value
  },
  updateProducts(state, products) {
    state.products = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
