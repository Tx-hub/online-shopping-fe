import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/css/global.css'
import axios from 'axios'
import './assets/fonts/iconfont.css'
axios.defaults.baseURL = 'http://127.0.0.1:3333/api/'
Vue.config.productionTip = false
Vue.prototype.$http = axios
// axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

import SocketIO from "socket.io-client"

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://localhost:3333",
}))



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
