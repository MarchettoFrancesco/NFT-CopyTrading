import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('tezos', value => {
  const val = (value / 1000000)
    .toFixed(2)
    .toString()
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return val + ' ꜩ'
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
