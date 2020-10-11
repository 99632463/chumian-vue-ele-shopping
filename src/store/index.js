import Vue from 'vue'
import Vuex from 'vuex'
import goods_create from './modules/goods_create'
import login from './modules/login'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    goods_create,
    login,
    menu
  }
})