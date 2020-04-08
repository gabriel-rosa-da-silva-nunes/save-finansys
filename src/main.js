import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import VueToastr from "vue-toastr";
import VMask from "v-mask";
import VCurrencyField from 'v-currency-field';
import { VTextField } from 'vuetify/lib'  //Globally import VTextField

Vue.component('v-text-field', VTextField)
Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0
});
Vue.config.productionTip = false
Vue.use(VMask);
Vue.use(Vuelidate);
Vue.use(VueToastr,{
  defaultStyle: {"font-family":"Roboto"}
});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
