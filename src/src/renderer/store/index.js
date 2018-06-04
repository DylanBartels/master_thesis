import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import wallet from './modules/wallet'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    wallet
  },
  getters
})

export default store
