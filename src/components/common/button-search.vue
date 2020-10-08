<template>
  <div>
    <div class="d-flex align-items-center">
      <slot name="left" />
      <div class="ml-auto" v-if="!advSearch && showSearch">
        <slot name="right">
          <el-input
            v-model="keyword"
            :placeholder="placeholder"
            size="mini"
            style="width: 150px"
            class="mr-2"
          ></el-input>
          <el-button type="info" size="mini" @click="$emit('search', keyword)">搜索</el-button>
          <el-button size="mini" @click="advSearch = true">高级搜索</el-button>
        </slot>
      </div>
    </div>
    <el-card class="box-card bg-light my-3" v-if="advSearch">
      <div slot="header" class="clearfix" style="margin: -10px">
        <span>高级搜索</span>
        <el-button @click="closeAdvSearch" style="float: right; padding: 3px 0" type="text">收起</el-button>
      </div>
      <slot name="form" />
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      keyword: '',
      advSearch: false
    }
  },
  methods: {
    closeAdvSearch() {
      this.advSearch = false
    }
  }
};
</script>

<style lang='scss' scoped>
</style>