import Vue from 'vue'
import Vuex from 'vuex'
import mode from './modules/mode'
import { myPlugin } from './plugins'

Vue.use(Vuex)

const state = {
  wrapper: 1
}

export default new Vuex.Store({
  state,
  mutations: {
    changeWrapper(state,data) {
      state.wrapper = data;
    },
  },
  actions: {
    changeWrapper({ commit, state }, params) {
      commit('changeWrapper', params)
    }
  },
  modules: {
    mode
  },
  plugins: [myPlugin]
})