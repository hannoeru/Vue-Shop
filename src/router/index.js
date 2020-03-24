import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Front/Home.vue'
import Login from '../views/Login'
import Dashboard from '../views/Admin/Dashboard'
import Products from '../views/Admin/Products'
import Orders from '../views/Admin/Orders'
import Coupons from '../views/Admin/Coupons'
import CustomerOrder from '../views/Front/CustomerOrder'
import CustomerCheckout from '../views/Front/CustomerCheckout'
import FrontProducts from '../views/Front/Products'
// import Checkout from '../views/Front/Checkout'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Products',
        component: FrontProducts
      },
      {
        path: 'Checkout',
        name: 'Checkout',
        component: CustomerOrder
      },
      {
        path: 'payment/:orderId',
        name: 'Payment',
        component: CustomerCheckout
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'customer_order',
        name: 'CustomerOrder',
        component: CustomerOrder
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
