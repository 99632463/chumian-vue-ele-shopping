<template>
  <div
    class="bg-white px-3"
    style="
      padding-top: 10px;
      margin: -20px;
      margin-top: -4px;
      margin-bottom: 0 !important;
    "
  >
    <button-search class="pb-1">
      <template #right>
        <div class="d-flex align-items-center">
          <el-date-picker
            size="mini"
            v-model="search.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-input style="width: 200px;" class="mx-2" v-model="search.keyword" size="medium" placeholder="请输入订单号"></el-input>
          <el-button type="info" size="medium">搜索</el-button>
        </div>
      </template>
    </button-search>

    <el-table
      border
      class="mt-3"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="45"
        align="center"
      ></el-table-column>
      <el-table-column 
        label="商品信息" 
        prop="name"
      > 
      </el-table-column>
      <el-table-column
        prop="username"
        label="商品清单"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="订单金额"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="收货信息"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="买家"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="交易状态"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="danger"
              size="mini"
              plain
              @click="deleteItem(scope)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px"></div>
    <el-footer
      class="border-top d-flex align-items-center px-0 position-fixed bg-white"
      style="z-index: 999; left: 200px; bottom: 0; right: 0"
    >
      <div class="flex-1 px-2">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-footer>
  </div>
</template>

<script>
import buttonSearch from "@/components/common/button-search";

export default {
  components: {
    buttonSearch,
  },
  data() {
    return {
      tableData: [
        
      ],
      currentPage: 1,
      multipleSelection: [],
      search:{
        keyword: '',
        time: ''
      }
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteItem(scope) {
      this.tableData.splice(scope.$index, 1);
    }
  },
};
</script>

<style lang='scss' scoped>
.sku-list-item:hover {
  background: #f4f4f4;
}
.sku-list-item i {
  display: none;
}
.sku-list-item:hover font {
  display: none;
}
.sku-list-item:hover i {
  display: block;
}
</style>