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
    <button-search ref="buttonSearch" class="pt-3" @search="searchEvent">
      <template #left>
        <div class="d-flex align-items-center">
          <el-button size="mini" type="danger" @click="deleteAll"
            >批量删除</el-button
          >
        </div>
      </template>
      <template #form>
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="评价用户" class="mb-0">
            <el-input
              v-model="form.username"
              placeholder="评价用户"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="评价类型" class="mb-0">
            <el-select v-model="form.type">
              <el-option label="区域一" value></el-option>
              <el-option label="区域二" value></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" class="mb-0">
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
          <el-form-item class="mb-0">
            <el-button type="info" size="mini" @click="searchEvent"
              >搜索</el-button
            >
            <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="media p-3">
            <img
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1362472642,3897454152&fm=11&gp=0.jpg"
              alt="John Doe"
              class="mr-3 mt-3 rounded-circle"
              style="width: 70px; height: 70px"
            />
            <div class="media-body">
              <h6 class="mt-0 d-flex">
                用户名 <span>2020</span>
                <el-button type="danger" class="ml-auto" size="mini"
                  >删除</el-button
                >
              </h6>
              <p>学的不仅是技术，更是梦想！！！</p>

              <div class="media p-3">
                <img
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1362472642,3897454152&fm=11&gp=0.jpg"
                  alt="John Doe"
                  class="mr-3 mt-3 rounded-circle"
                  style="width: 70px; height: 70px"
                />
                <div class="media-body">
                  <h6 class="mt-0 d-flex">
                    用户名 <span>2020</span>
                    <el-button type="danger" class="ml-auto" size="mini"
                      >删除</el-button
                    >
                  </h6>
                  <p>学的不仅是技术，更是梦想！！！</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ID" align="center" prop="id" width="70">
      </el-table-column>
      <el-table-column label="商品" width="380">
        <template slot-scope="scope">
          <div class="media">
            <img
              class="mr-3"
              style="width: 60px; height: 60px"
              :src="scope.row.goods.cover"
              alt
            />
            <div class="media-body">
              <p class="mt-0 font-weight-bold">{{ scope.row.goods.title }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="评价信息" width="250">
        <template slot-scope="scope">
          <div class="d-flex flex-column">
            <p>用户名: {{ scope.row.username }}</p>
            <p>
              评分:
              <el-rate
                v-model="scope.row.star"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="评价时间" align="center">
      </el-table-column>
      <el-table-column label="是否显示" align="center" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
        {
          id: 1,
          goods: {
            title: "商品名称",
            cover:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1362472642,3897454152&fm=11&gp=0.jpg",
          },
          username: "用户名",
          star: 5,
          create_time: "2020",
          status: 1,
        },
      ],
      currentPage: 1,
      multipleSelection: [],
      form: {
        username: "",
        type: 0,
        time: "",
      },
    };
  },
  mounted() {},
  methods: {
    clearSearch() {},
    searchEvent() {},
    deleteAll() {
      this.multipleSelection.forEach((item) => {
        const index = this.tableData.findIndex((v) => v.id === item.id);
        if (index > -1) {
          this.tableData.splice(index, 1);
        }
      });

      this.multipleSelection = [];
    },
  },
};
</script>

<style lang='scss' scoped>
</style>