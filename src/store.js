import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    emailLogin:''
  },
  mutations: {
    changeTheme(state) {
      state.dark = !state.dark;
    },
    changeLogin(state,email) {
      state.emailLogin = email;
    }
  },
  actions: {
    
  }
})
