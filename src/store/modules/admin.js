import notify from '../../utils/notify';
import headers from '../headers';
import router from '../../router';
import api from '../../api/admin';

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
};

const getters = {
  sortOrder: state => {
    const orders = [...state.orders];
    let newOrder = [];
    if (orders.length) {
      newOrder = orders.sort((a, b) => {
        const aIsPaid = a.is_paid ? 1 : 0;
        const bIsPaid = b.is_paid ? 1 : 0;
        return bIsPaid - aIsPaid;
      });
    }
    return newOrder;
  }
};

const actions = {
  async getProducts({ commit }, page = 1) {
    commit('updateLoading', ['products', true]);
    // Api
    const { data } = await api.getProducts(page);
    commit('updateLoading', ['products', false]);
    // Error msg
    if (!data.success) {
      notify(data);
      return router.push('login');
    }
    // Update data
    commit('updateProducts', data.products);
    commit('updatePagination', [data.pagination, 'products']);
  },
  async getOrders({ commit }, page = 1) {
    commit('updateLoading', ['orders', true]);
    // Api
    const { data } = await api.getOrders(page);
    commit('updateLoading', ['orders', false]);
    // Error msg
    if (!data.success) {
      notify(data);
      return router.push('login');
    }
    // Update data
    commit('updateOrders', data.orders);
    commit('updatePagination', [data.pagination, 'orders']);
  },
  async getCoupons({ commit }) {
    commit('updateLoading', ['coupons', true]);
    // Api
    const { data } = await api.getCoupons();
    commit('updateLoading', ['coupons', false]);
    // Error msg
    if (!data.success) {
      notify(data);
      return router.push('login');
    }
    // Update data
    commit('updateCoupons', data.coupons);
  },
  async updateProduct({ dispatch, commit }, { isNew, product }) {
    commit('updateLoading', ['productUpdate', isNew ? 'new' : product.id]);
    // Api
    const { data } = await api.updateProduct(product, isNew);
    commit('updateLoading', ['productUpdate', null]);
    // Error msg
    notify(data);
    if (!data.success) return;
    // Update data
    dispatch('getProducts');
  },
  async updateCoupon({ dispatch, commit }, { isNew, coupon }) {
    commit('updateLoading', ['couponUpdate', isNew ? 'new' : coupon.id]);
    // Api
    const { data } = await api.updateCoupon(coupon, isNew);
    commit('updateLoading', ['couponUpdate', null]);
    // Error msg
    notify(data);
    if (!data.success) return;
    // Update data
    dispatch('getCoupons');
  },
  async deleteProduct({ dispatch, commit }, id) {
    commit('updateLoading', ['productDelete', id]);
    // Api
    const { data } = await api.deleteProduct(id);
    commit('updateLoading', ['productDelete', null]);
    // Error msg
    notify(data);
    if (!data.success) return;
    // Update data
    dispatch('getProducts');
  },
  async deleteCoupon({ dispatch, commit }, id) {
    commit('updateLoading', ['couponDelete', id]);
    // Api
    const { data } = await api.deleteProduct(id);
    commit('updateLoading', ['couponDelete', null]);
    notify(data);
    if (!data.success) return;
    // Update data
    dispatch('getCoupons');
  },
  async uploadFile({ commit }, file) {
    commit('updateLoading', ['uploading', true]);
    // Api
    const { data } = await api.uploadFile(file);
    commit('updateLoading', ['uploading', false]);
    // Error msg
    notify(data, true);
    if (!data.success) return;
    // Update data
    return data.imageUrl;
  }
};

const mutations = {
  updateDrawer(state, value) {
    state.drawer = value;
  },
  updateProducts(state, products) {
    state.products = products;
  },
  updateOrders(state, orders) {
    state.orders = orders;
  },
  updateCoupons(state, coupons) {
    state.coupons = coupons;
  },
  updateLoading(state, [which, value]) {
    state.loadings[which] = value;
  },
  updateTempProduct(state, value) {
    state.tempProducts = value;
  },
  updatePagination(state, [value, location]) {
    state.pagination[location] = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
