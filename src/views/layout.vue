<template>
  <el-container class="layout">
    <el-header class="header d-flex align-items-center">
      <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>
      <el-menu
        :default-active="nav.active"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index) in nav.list"
          :key="index"
          :index="index.toString()"
        >
          {{item.name}}
        </el-menu-item>
        <el-submenu index="6">
          <template slot="title">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>summer
          </template>
          <el-menu-item index="6-1">修改</el-menu-item>
          <el-menu-item index="6-2">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container style="height:100%;">
      <el-aside width="200px">
        <el-menu :default-active="slideMenuActive" style="height:100%;padding-bottom: 0" @select="slideSelect">
          <el-menu-item v-for="(item, index) in slideMenu" :key="index" :index="index.toString()">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="bg-light position-relative">
        <el-breadcrumb v-if="bran.length" class="bread border-bottom mb-1 bg-white" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in bran" :key="item.path" :to="{path: item.path}">
            {{item.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <router-view />

        <el-backtop target=".el-main" :bottom="50"> 
          <div class="backtop">UP</div>
        </el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      nav: {},
      bran: []
    };
  },
  created() {
    this.nav = this.$conf.nav
    this.getRouterBran()
    this.__initNav();
  },
  computed: {
    slideMenu() {
      return this.nav.list[this.nav.active].submenu || [];
    },
    slideMenuActive: {
      get() {
        return this.nav.list[this.nav.active].subActive || '0';
      },
      set(key) {
        this.nav.list[this.nav.active].subActive = key;
      }
    }
  },
  methods: {
    __initNav(){
      const active = JSON.parse(localStorage.getItem('navActive'))
      if(active) {
        this.nav.active = active.top;
        this.slideMenuActive = active.left
      } 
    },
    handleSelect(key) {
      this.nav.active = key;
      if(this.slideMenu.length) {
        this.$router.push(this.slideMenu[this.slideMenuActive].path)
      }
    },
    slideSelect(key) {
      const currentPath = this.slideMenu[key]
      this.slideMenuActive = key
      this.$router.push(currentPath.path)
    },
    getRouterBran() {
      const matchs = this.$route.matched
      matchs.forEach(item => {
        if(item.name === 'layout' || item.name === 'index'){
          this.bran = []
          return;
        }

        this.bran = [
          ...this.bran, 
          {
            name: 'index',
            path: '/index',
            title: '后台首页'
          },
          {
            name: item.name,
            path: item.path,
            title: item.meta.title
          }
        ]
      })

      this.$watch('$route', () => {
        this.getRouterBran()

        localStorage.setItem('navActive', JSON.stringify({
          top: this.nav.active,
          left: this.slideMenuActive
        }))
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.layout {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .header {
    background: #545c64;
  }
  .bread{
    margin: -20px;
    padding: 20px;
  }
  .backtop{
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
}
</style>