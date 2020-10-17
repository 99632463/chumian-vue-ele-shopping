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
        component: 'shop/goods/list'
      },
      {
        meta: { title: '发布商品' },
        component: 'shop/goods/create'
      },
      {
        meta: { title: '相册管理' },
        component: 'image'
      },
      {
        meta: { title: '分类管理' },
        component: 'shop/category/list'
      },
      {
        meta: { title: '商品规格管理' },
        component: 'shop/sku/list'
      },
      {
        meta: { title: '商品类型管理' },
        component: 'shop/type/list'
      },
      {
        meta: { title: '商品评论管理' },
        component: 'shop/comment/list'
      },
      {
        meta: { title: '发票管理' },
        component: 'order/invoice/list'
      },
      {
        meta: { title: '售后管理' },
        component: 'order/after-sale/list'
      },
      {
        meta: { title: '订单列表' },
        component: 'order/order/list'
      },
      {
        meta: { title: '会员列表' },
        component: 'user/user-list/list'
      },
      {
        meta: { title: '会员等级' },
        component: 'user/level/list'
      },
      {
        meta: { title: '基础设置' },
        component: 'set/base'
      },
      {
        meta: { title: '物流设置' },
        component: 'set/express'
      },
      {
				meta:{title:'管理员管理'},
				component: 'set/manager'
			},
			{
				meta:{title:'交易设置'},
				component:'set/payment'
			},
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

const createRoutes = routes => {
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (!item.component) {
      return
    }

    item.path = item.path || `/${item.component}`
    item.name = item.mame || item.component.replace(/\//g, '_')

    const component = import(`@/views/${item.component}`)
    item.component = () => component

    if (item.children && item.children.length) {
      createRoutes(item.children)
    }
  }
}

const getRoutes = () => {
  createRoutes(routes)
  return routes
}

export default getRoutes()