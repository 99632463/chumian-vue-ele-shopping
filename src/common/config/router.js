const routes = [
  {
    path: '/',
    component: 'layout',
    redirect: 'index',
    children: [
      {
        meta: { title: '后台首页' },
        component: 'index'
      },
      {
        meta: { title: '商品列表' },
        component: 'shop/goods'
      },
      {
        meta: { title: '相册管理' },
        component: 'photo'
      }
    ]
  },
  {
    meta: { title: '登录页' },
    component: 'login'
  },
  {
    path: '*',
    redirect: 'index'
  }
]

const getRoutes = () => {
  createRoutes(routes)
  return routes
}

const createRoutes = routes => {
  for(let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (!item.component) {
      return
    }

    item.path = item.path || `/${item.component}`
    item.name = item.mame || item.component.replace(/\//g, '_')

    const component = import(`@/views/${item.component}`)
    item.component = () => component

    if(item.children && item.children.length) {
      createRoutes(item.children)
    }
  }
}

export default getRoutes()