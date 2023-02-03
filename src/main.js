import Vue from 'vue'
import App from './App.vue'
import store from '@/stores/index.js'
import ElementUI from '@/plugins/elementUI'
import DB from '@/plugins/db'

Vue.use(DB)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
