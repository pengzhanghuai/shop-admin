// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
// import '../static/index.css'
Vue.use(ElementUI)
// 原型链上挂载axios
import axios from "axios";
Vue.prototype.axios = axios;
// 原型链上挂载apis
import apis from "./common/js/api";
Vue.prototype.$apis = apis;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
