import notify from '../../utils/notify';
import router from '../../router';
import api from '../../api/front';

const state = {
  title: '網路點數專賣',
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
};

const getters = {
  selectOptions() {
    let options = [];
    for (let i = 1; i < 10; i++) {
      options.push({
        label: '選購' + i + '件',
        value: i
      });
    }
    return options;
  }
};

const actions = {
  async getProducts({ commit }, page = 1) {
    commit('updateLoading', ['products', true]);
    // Api
    const { data } = await api.getProducts(page);
    commit('updateLoading', ['products', false]);
    // Error msg
    if (data.success) return notify(data);
    // Update data
    commit('updateProducts', data.products);
    commit('updatePagination', [data.pagination, 'products']);
  },
  async getAllProducts({ commit }) {
    commit('updateLoading', ['products', true]);
    // Api
    const { data } = await api.getAllProducts();
    commit('updateLoading', ['products', false]);
    // Error msg
    if (!data.success) return notify(data);
    // Update data
    commit('updateProducts', data.products);
  },
  async getProduct({ commit }, id) {
    commit('updateLoading', ['product', id]);
    // Api
    const { data } = await api.getProduct(id);
    commit('updateLoading', ['product', null]);
    // Error msg
    if (!data.success) return notify(data);
    // Return data
    return data.product;
  },
  async addToCart({ dispatch, commit }, [id, num = 1]) {
    commit('updateLoading', ['addToCart', id]);
    // Api
    const { data } = await api.addToCart(id, num);
    commit('updateLoading', ['addToCart', null]);
    // Message
    notify(data);
    // ErrorHandler
    if (!data.success) return;
    // Update data
    dispatch('getCarts');
  },
  async getCarts({ commit }) {
    commit('updateLoading', ['cart', true]);
    // Api
    const { data } = await api.getCarts();
    commit('updateLoading', ['cart', false]);
    // Error msg
    if (!data.success) return notify(data);
    // Update data
    commit('updateCartData', data.data);
  },
  async deleteCart({ dispatch, commit }, id) {
    commit('updateLoading', ['deleteCart', id]);
    // Api
    const { data } = await api.deleteCart(id);
    commit('updateLoading', ['deleteCart', null]);
    // Message
    notify(data);
    // ErrorHandler
    if (!data.success) return;
    // Update data
    dispatch('getCarts');
  },
  async addCouponCode({ dispatch, commit }, code) {
    commit('updateLoading', ['addCouponCode', true]);
    // Api
    const { data } = await api.addCouponCode(code);
    commit('updateLoading', ['addCouponCode', false]);
    // Message
    notify(data);
    // ErrorHandler
    if (!data.success) return;
    // Update data
    dispatch('getCarts');
  },
  async createOrder({ dispatch, commit }, order) {
    commit('updateLoading', ['createOrder', true]);
    // Api
    const { data } = await api.createOrder(order);
    commit('updateLoading', ['createOrder', false]);
    // Message
    notify(data);
    // ErrorHandler
    if (!data.success) return;
    // Update data
    dispatch('getCarts');
    // redirect
    router.push('payment/' + data.orderId);
  },
  async getOrder({ commit }, id) {
    commit('updateLoading', ['getOrder', true]);
    // Api
    const res = await api.getOrder(id);
    commit('updateLoading', ['getOrder', false]);
    // Error msg
    if (!res.data.success) return notify(res.data);
    // Update data
    commit('updateOrder', res.data.order);
  },
  async payOrder({ dispatch, commit }, id) {
    commit('updateLoading', ['payOrder', true]);
    // Api
    const { data } = await api.payOrder(id);
    commit('updateLoading', ['payOrder', false]);
    notify(data);
    if (!data.success) return;
    dispatch('getOrder', id);
  }
};

const mutations = {
  updateProducts(state, products) {
    state.products = products;
  },
  updateLoading(state, [which, value]) {
    state.loadings[which] = value;
  },
  updatePagination(state, [value, location]) {
    state.pagination[location] = value;
  },
  updateCartData(state, cartData) {
    state.cartData = cartData;
  },
  updateOrder(state, order) {
    state.order = order;
  },
  checkOrderInfo(state, info) {
    state.checkOrderInfo = info;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
