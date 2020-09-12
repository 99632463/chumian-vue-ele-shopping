import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './common/plugins/elm'
import $conf from './common/config/config'
import directives from './common/directives'

Vue.config.productionTip = false
Vue.prototype.$conf = $conf

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
