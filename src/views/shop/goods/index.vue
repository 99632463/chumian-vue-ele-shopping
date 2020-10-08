<template>
  <div class="bg-white px-3" style="margin: -20px; margin-top: -1rem">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabbars" :key="index" :label="item.name">
        <button-search placeholder="请选择要搜索的商品" @search="searchEvent">
          <template #left>
            <div class="d-flex align-items-center">
              <router-link :to="{name: 'shop_goods_create'}">
                <el-button type="success" size="mini">发布商品</el-button>
              </router-link>
              <el-button type="warning" size="mini">恢复商品</el-button>
              <el-button type="danger" size="mini">批量删除</el-button>
              <el-button size="mini">上架</el-button>
              <el-button size="mini">下架</el-button>
              <el-button size="mini">推荐</el-button>
            </div>
          </template>
          <template #form>
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
          </template>
        </button-search>

        <el-table
          border
          class="mt-3"
          :data="tableData[index].list"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <el-table-column label="商品" width="380">
            <template slot-scope="scope">
              <div class="media">
                <img class="mr-3" style="width:60px;height:60px" :src="scope.row.cover" alt />
                <div class="media-body">
                  <p class="mt-0 font-weight-bold">{{scope.row.title}}</p>
                  <p class="mb-0">分类: {{scope.row.category}}</p>
                  <p class="mb-0">时间: {{scope.row.create_time}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="商品类型" align="center"></el-table-column>
          <el-table-column prop="sale_count" label="实际销量" align="center"></el-table-column>
          <el-table-column prop="order" label="商品排序" align="center"></el-table-column>
          <el-table-column label="商品状态" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="mini" plain @click="scope.row.isCheck = 1">审核通过</el-button>

              <el-button
                class="ml-0 mt-2"
                type="danger"
                size="mini"
                plain
                @click="scope.row.isCheck = 2"
              >审核通过</el-button>

              <!-- <el-button
                :type="scope.row.status === 1 ? 'success' : 'danger'"
                size="mini"
                plain
                @click="changeStatus(scope.row)"
              >{{scope.row.status === 1 ? '上架' : '下架'}}</el-button>-->
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="总库存" align="center"></el-table-column>
          <el-table-column prop="price" label="价格(元)" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template>
              <el-button-group>
                <el-button type="primary" size="mini" plain>修改</el-button>
                <el-button type="danger" size="mini" plain @click="deleteItem(index)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <div style="height: 60px"></div>
        <el-footer
          class="border-top d-flex align-items-center px-0 position-fixed bg-white"
          style="z-index:999; left:200px; bottom:0; right: 0"
        >
          <div class="flex-1 px-2">
            <el-pagination
              :current-page="tableData[index].currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </el-footer>
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
      tableData: [],
      multipleSelection: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      for (let i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: [],
        });

        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: 1,
            title: "html" + i + "-" + j,
            cover:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2699863970,3643884691&fm=26&gp=0.jpg",
            create_time: "2019-01-25",
            category: "手机",
            type: "普通手机",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            price: 1000,
            isCheck: 1, // 0 未审核 1 通过 2 不通过
          });
        }
      }
    },
    handleClick(tab) {
      console.log(tab);
    },
    searchEvent() {},
    clearSearch() {
      this.form = {};
      this.advSearch = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteItem(index) {
      this.$confirm("您确认要删除此商品吗?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功 !",
        });
        this.tableData[index].list.splice(index, 1);
      });
    },
    changeStatus(item) {
      item.status = item.status === 0 ? 1 : 0;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>