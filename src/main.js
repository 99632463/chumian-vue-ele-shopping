import Vue from 'vue'
import './plugins/axios'
import router from './router'
import App from './App.vue'
import './common/plugins/elm'
import $conf from './common/config/config'
import directives from './common/directives'
import store from './store'

console.log(1);

import VueDND from 'awe-dnd'
Vue.use(VueDND)

Vue.config.productionTip = false
Vue.prototype.$conf = $conf

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
