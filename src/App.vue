<template>
  <div id="app">
     <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang='scss'>
/* 滚动条凹槽的颜色，还可以设置边框属性 */
::-webkit-scrollbar-track-piece {
  background-color:#ccc;
}
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width:9px;
  height:9px;
}
/* 滚动条的设置 */
::-webkit-scrollbar-thumb {
  background-color:#999;
  background-clip:padding-box;
  min-height:28px;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background-color:#666;
}
</style>
