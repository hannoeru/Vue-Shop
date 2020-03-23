import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_TW from 'vee-validate/dist/locale/zh_TW.json'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
localize('zh_TW', zh_TW)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
