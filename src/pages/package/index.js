import Vue from 'vue'
import App from './App.vue'
import '@assets/js/import';
import '@assets/css/animation.css';
import '@/directive';
import router from  './router'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

