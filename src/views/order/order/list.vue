<template>
  <div class="bg-white px-3" style="margin: -20px; margin-top: -1rem">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabbars" :key="index" :label="item.name">
        <button-search placeholder="请选择要搜索的订单编号" @search="searchEvent">
          <template #left>
            <div class="d-flex align-items-center">
              <el-button type="success" size="mini">导出数据</el-button>
              <el-button type="danger" size="mini">批量删除</el-button>
            </div>
          </template>
          <template #form>
            <el-form inline ref="form" :model="form" label-width="80px">
              <el-form-item label="订单编号" class="mb-0">
                <el-input v-model="form.code" placeholder="订单编号" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="订单状态" class="mb-0">
                <el-select v-model="form.type" size="mini" placeholder="请选择订单状态">
                  <el-option label="区域一" value></el-option>
                  <el-option label="区域二" value></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下单时间" class="mb-0">
                <el-date-picker
                  size="mini"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收货人" class="mb-0">
                <el-input v-model="form.username" placeholder="收货人" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="手机号" class="mb-0">
                <el-input v-model="form.phone" placeholder="手机号" size="mini"></el-input>
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
          :data="tableData[index] && tableData[index].list"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <el-table-column label="商品" width="350">
            <template slot-scope="scope">
              <div class="d-flex">
                <div style="flex:1">
                  <p class="mb-1">订单编号</p>
                  <p class="mb-1"><small>2014523652</small></p>
                </div>
                <div style="flex:1">
                  <p class="mb-1">下单时间</p>
                  <p class="mb-1"><small>2014523652</small></p>
                </div>
              </div>
              <div class="media">
                <img class="mr-3" style="width:60px;height:60px" :src="scope.row.cover" alt />
                <div class="media-body">
                  <p class="mt-0 font-weight-bold">
                    <a href="#" class="text-primary">{{scope.row.title}}</a>
                  </p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实付款" 
            width="120"
            align="center"
          >
            <template slot-scope='scope'>
              <span>￥20</span>
              <p><small>(含运费: ￥0.00)</small></p>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            label="买家" 
            align="center"
          >
            <template slot-scope='scope'>
              <span>用户名</span>
              <p><small>(用户id: 11)</small></p>
            </template>
          </el-table-column>
          <el-table-column label="支付方式" align="center">
            <template slot-scope="scope">
              <span class="badge badge-success">微信支付</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="配送方式" align="center"></el-table-column>
          <el-table-column width="170" label="交易状态" align="center">
            <template slot-scope="scope">
              <div>
                付款状态:
                <span class="badge badge-success">已付款</span>
              </div>
              <div>
                发货状态:
                <span class="badge badge-success">待发货</span>
              </div>
              <div>
                收获状态:
                <span class="badge badge-success">待收货</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <el-button type="primary" size="mini" plain>订单详情</el-button>
          </el-table-column>
        </el-table>
        <div style="height: 60px"></div>
        <el-footer
          class="border-top d-flex align-items-center px-0 position-fixed bg-white"
          style="z-index:999; left:200px; bottom:0; right: 0"
        >
          <div class="flex-1 px-2">
            <el-pagination
              :current-page="tableData[index] && tableData[index].currentPage"
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
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "已发货" },
        { name: "已收获" },
        { name: "已完成" },
        { name: "已关闭" },
        { name: "退款中" },
      ],
      advSearch: false,
      form: {
        code: "",
        type: "",
        time: "",
        username: "",
        phone: "",
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
      this.form = {
        code: "",
        type: "",
        time: "",
        username: "",
        phone: "",
      };
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