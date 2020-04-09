import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    tipoLogin: '',
    userLogin:'',
    userLinkFoto:'',
    userName: '',
  },
  mutations: {
    changeTheme(state) {
      state.dark = !state.dark;
    },
    changeLogin(state,email) {
      state.emailLogin = email;
    },
    changePhoto(state,linkPhoto) {
      state.userLinkFoto = linkPhoto;
    },
    changeName(state,name) {
      state.userName = name;
    },
    changeTipoLogin(state,tipo) {
      state.tipoLogin = tipo;
    }
  },
  actions: {
    
  }
})
