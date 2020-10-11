export default {
  namespaced: true,
  state: {
    user: {},
    token: ''
  },
  getters: {
    
  },
  mutations: {
    initUser(state){
      const user = localStorage.getItem('user')
      if(user){
        state.user = JSON.parse(user)
        state.token = state.user.token
      }
    },
    login(state, user){
      state.user = user
      state.token = user.token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', user.token)
    },
    logoutDestroy(state){
      state.user = {}
      state.token = ''
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  actions: {

  }
}