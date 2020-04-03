import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin`,
  withCredentials: true
});

const getProducts = function(page) {
  return axios.get('products?page=' + page);
};

const getOrders = function(page) {
  return axios.get('orders?page=' + page);
};

const getCoupons = function() {
  return axios.get('coupons');
};

const updateProduct = function(product, isNew) {
  const url = isNew ? 'product' : 'product/' + product.id;
  const httpMethod = isNew ? 'post' : 'put';
  const data = { data: product };
  return axios[httpMethod](url, data);
};

const updateCoupon = function(coupon, isNew) {
  const url = isNew ? 'coupon' : 'coupon/' + coupon.id;
  const httpMethod = isNew ? 'post' : 'put';
  const data = { data: coupon };
  return axios[httpMethod](url, data);
};

const deleteProduct = function(id) {
  return axios.delete('product/' + id);
};

const deleteCoupon = function(id) {
  return axios.delete('coupon/' + id);
};

const uploadFile = function(file) {
  const formData = new FormData();
  formData.append('file-to-upload', file);
  return axios.post('upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default {
  getProducts,
  getOrders,
  getCoupons,
  updateProduct,
  updateCoupon,
  deleteProduct,
  deleteCoupon,
  uploadFile
};
