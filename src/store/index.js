import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    register: false
  },
  mutations: {
    enableRegister(state){
      state.register = !state.register
    }
  },
  actions: {
  },
  modules: {
  }
})
