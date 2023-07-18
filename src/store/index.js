import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCart from './shoppingCart'
import pageCarousel from './pageCarousel'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedProduct: {},
  },
  getters: {},
  mutations: {
    selectProduct(state, data) {
      state.selectedProduct = data
    },
  },
  actions: {},
  modules: {
    shoppingCart,
    pageCarousel,
  },
})
