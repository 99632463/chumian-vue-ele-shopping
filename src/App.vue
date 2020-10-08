<template>
  <div id="app">
     <router-view />

     <photo-dialog ref="photoDialog" :max="maxSelectImageNum"/>
     <sku-dialog ref="skuDialog" />
  </div>
</template>

<script>
import photoDialog from '@/components/common/photo-dialog'
import skuDialog from '@/components/sku/sku-dialog'

export default {
  name: 'app',
  components:{
    photoDialog,
    skuDialog
  },
  provide() {
    return {
      app: this
    };
  },
  data(){
    return {
      maxSelectImageNum: 9
    }
  },
  methods:{
    chooseImage(callback, max = 9){
      this.maxSelectImageNum = max
      this.$refs.photoDialog.chooseImage(callback)
    },
    chooseSkus(callback){
      this.$refs.skuDialog.chooseSkus(callback)
    }
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
