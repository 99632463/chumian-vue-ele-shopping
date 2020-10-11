import Vue from 'vue'
import Router from 'vue-router'
import routes from './common/config/router'

Vue.use(Router)

const router = new Router({ routes })

router.beforeEach((to, form, next) => {
  const token = localStorage.getItem('token')
  if(token) {
    if(to.path === '/login') {
      Vue.prototype.$message.error('请不要重复登录')
      return next({ name: form.name })
    }
    next()
  } else {
    if(to.path === '/login') {
      return next()
    }
    Vue.prototype.$message.error('请先登录')
    next('/login')
  }
})

export default router