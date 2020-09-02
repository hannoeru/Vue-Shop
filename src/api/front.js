import axiosBase from 'axios';
axiosBase.defaults.withCredentials = true;
const axios = axiosBase.create({
  baseURL: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}`
});

const getProducts = function(page) {
  return axios.get('products?page=' + page);
};

const getAllProducts = function() {
  return axios.get('products/all');
};

const getProduct = function(id) {
  return axios.get('product/' + id);
};

const addToCart = function(id, num) {
  const cart = {
    data: {
      product_id: id,
      qty: num
    }
  };
  return axios.post('cart', cart);
};

const getCarts = function() {
  return axios.get('cart');
};

const deleteCart = function(id) {
  return axios.delete('cart/' + id);
};

const addCouponCode = function(code) {
  const coupon = {
    data: { code: code }
  };
  return axios.post('coupon', coupon);
};

const createOrder = function(order) {
  const data = { data: order };
  return axios.post('order', data);
};

const getOrder = function(id) {
  return axios.get('order/' + id);
};

const payOrder = function(id) {
  return axios.post('pay/' + id);
};

export default {
  getProducts,
  getAllProducts,
  getProduct,
  addToCart,
  getCarts,
  deleteCart,
  addCouponCode,
  createOrder,
  getOrder,
  payOrder
};
