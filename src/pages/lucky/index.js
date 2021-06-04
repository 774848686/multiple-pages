import Vue from 'vue'
import Index from './index.vue'
import '@assets/js/import';
import '@assets/css/animation.css';
import '@/directive';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(Index)
}).$mount('#app')

