export default {
  namespaced: true,
  state: {
    nav:{
      active: "0",
      list: []
    }
  },
  getters: {
    
  },
  mutations: {
    createNavBar(state, menus){
      const list = menus.map(item => {
        const submenu = item.child.map(v => {
          return {
            icon: v.icon,
            path: `/${v.desc.replace(/_/g, '/')}`,
            name: v.name
          }
        })

        return {
          name: item.name,
          subActive: '0',
          submenu
        }
      })

      state.nav.list = list
      localStorage.setItem('nav', JSON.stringify(state.nav))
    },
    initNavBar(state){
      const nav = localStorage.getItem('nav')
      state.nav = nav ? JSON.parse(nav) : {
        active: "0",
        list: []
      }
    }
  },
  actions: {

  }
}