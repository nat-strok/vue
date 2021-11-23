import Vue from 'vue'
import App from './App.vue'
import CButton from './components/global/CButton'

Vue.component('c-btn', CButton)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
