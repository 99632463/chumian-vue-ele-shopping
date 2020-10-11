export default {
  nav: {
    active: "0",
    list: [
      {
        name: "首页",
        subActive: '0',
        submenu: [
          {
            icon: "el-icon-s-home",
            path: '/index',
            name: "后台首页"
          },
          {
            icon: "el-icon-s-claim",
            path: '/shop/goods/list',
            name: "商品列表"
          },
          {
            icon: "el-icon-picture",
            path: '/image',
            name: "相册管理"
          }
        ]
      },
      { 
        name: "商品",
        subActive: '0',
        submenu: [
          {
            icon: "el-icon-s-claim",
            path: '/shop/goods/list',
            name: "商品列表"
          },
          {
            icon: "el-icon-s-help",
            path: '/shop/category/list',
            name: "分类列表"
          },
          {
            icon: "el-icon-s-help",
            path: '/shop/sku/list',
            name: "商品规格"
          },
          {
            icon: "el-icon-s-help",
            path: '/shop/type/list',
            name: "商品类型"
          },
          {
            icon: "el-icon-s-help",
            path: '/shop/comment/list',
            name: "商品评论"
          }
        ]
      },
      { 
        name: "订单",
        subActive: '0',
        submenu: [
          {
            icon: "el-icon-s-claim",
            path: '/order/order/list',
            name: "订单列表"
          },
          {
            icon: "el-icon-s-claim",
            path: '/order/invoice/list',
            name: "发票管理"
          },
          {
            icon: "el-icon-s-claim",
            path: '/order/after-sale/list',
            name: "售后管理"
          }
        ]
      },
      { 
        name: "会员",
        subActive: '0',
        submenu: [
          {
            icon: "el-icon-s-claim",
            path: '/user/user-list/list',
            name: "会员列表"
          },
          {
            icon: "el-icon-s-claim",
            path: '/user/level/list',
            name: "会员等级"
          }
        ]
      },
      { 
        name: "设置",
        subActive: '0',
        submenu: [
          {
            icon: "el-icon-s-claim",
            path: '/set/base',
            name: "基础设置"
          },
          {
            icon: "el-icon-s-claim",
            path: '/set/express',
            name: "物流设置"
          }
        ]
      }
    ]
  }
}