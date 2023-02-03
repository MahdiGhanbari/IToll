import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countyTypes: [
      'USA',
      'IR',
      'FR',
      'AR'
    ],
    status: [
      'pushed',
      'draft'
    ]
  }
})