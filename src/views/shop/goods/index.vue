<template>
  <div class="bg-white px-3" style="margin: -20px; margin-top: -1rem">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabbars" :key="index" :label="item.name">
        <el-card class="box-card bg-light my-3" v-if="advSearch">
          <div slot="header" class="clearfix" style="margin: -10px">
            <span>高级搜索</span>
            <el-button
              @click="advSearch = false"
              style="float: right; padding: 3px 0"
              type="text"
            >收起</el-button>
          </div>
          <el-form inline ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称" class="mb-0">
              <el-input v-model="form.name" placeholder="商品名称" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" class="mb-0">
              <el-input v-model="form.code" placeholder="商品编码" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" class="mb-0">
              <el-select v-model="form.type">
                <el-option label="区域一" value></el-option>
                <el-option label="区域二" value></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品分类" class="mb-0">
              <el-input v-model="form.category" placeholder="商品分类" size="mini"></el-input>
            </el-form-item>
            <el-form-item class="mb-0">
              <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
              <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <button-search placeholder="请选择要搜索的商品" @search="searchEvent">
          <template #left>
            <div class="d-flex align-items-center">
              <el-button type="success" size="mini">发布商品</el-button>
              <el-button type="danger" size="mini">批量删除</el-button>
            </div>
          </template>
          <template #form></template>
        </button-search>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from "@/components/common/button-search";

export default {
  name: "shop-googs",
  components: {
    buttonSearch,
  },
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
      advSearch: false,
      form: {
        name: "",
        code: "",
        type: "",
        category: "",
      },
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    searchEvent() {},
    clearSearch() {
      this.form = {};
      this.advSearch = false;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>