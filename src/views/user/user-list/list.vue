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
    <button-search class="pb-1" placeholder="手机号/邮箱/会员昵称">
      <template #left>
        <div class="d-flex align-items-center">
          <el-button size="mini" type="success" @click="openModal(false)"
            >添加会员</el-button
          >
        </div>
      </template>
      <template #form>
        <el-form inline ref="form" :model="search" label-width="80px">
          <el-form-item label="搜索内容" class="mb-0">
            <el-input
              v-model="search.keyword"
              placeholder="手机号/邮箱/会员昵称"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员等级" class="mb-0">
            <el-select
              v-model="search.group_id"
              size="mini"
              placeholder="请选择会员等级"
            >
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

    <el-table border class="mt-3" :data="tableData" style="width: 100%">
      <el-table-column label="会员" width="280">
        <template slot-scope="scope">
          <div class="media">
            <img
              class="mr-3 rounded-circle"
              style="width: 40px; height: 40px"
              :src="scope.row.avatar"
            />
            <div class="media-body">
              <h6 class="mt-0 d-flex align-items-center">
                {{ scope.row.username }}
                <el-button class="ml-auto" type="text" size="mini"
                  >详情</el-button
                >
              </h6>
              用户id: {{ scope.row.id }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员等级">
        <template slot-scope="scope">
          {{ scope.row.level.name }}
        </template>
      </el-table-column>
      <el-table-column label="登录注册" width="250" align="center">
        <template slot-scope="scope">
          <div>注册时间: {{ scope.row.create_time }}</div>
          <div>最后登录 : {{ scope.row.update_time }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="openModal(scope)"
            >修改</el-button
          >
          <el-button type="text" size="mini">重置密码</el-button>
          <el-button type="text" size="mini" @click="deleteItem(scope)"
            >删除</el-button
          >
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

    <el-dialog title="添加会员" :visible.sync="createModal" top="5vh">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            style="width: 25%"
            v-model="form.username"
            placeholder="请输入用户名"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            style="width: 25%"
            v-model="form.password"
            placeholder="请输入密码"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            style="width: 25%"
            v-model="form.nickname"
            placeholder="请输入昵称"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <span
            v-if="!form.avatar"
            @click="chooseImage"
            class="btn btn-light border"
          >
            <i class="el-icon-plus"></i>
          </span>
          <img
            v-else
            :src="form.avatar"
            class="rounded"
            width="45"
            height="45"
            style="cursor: poineter"
            @click="chooseImage"
          />
        </el-form-item>
        <el-form-item label="会员等级" size="mini">
          <el-select v-model="form.level_id" placeholder="请选择会员等级">
            <el-option label="普通会员" :value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            style="width: 25%"
            v-model="form.phone"
            placeholder="请输入手机"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            style="width: 25%"
            v-model="form.email"
            placeholder="请输入邮箱"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="mini">
            <el-radio :label="0" border>保密</el-radio>
            <el-radio :label="1" border>男性</el-radio>
            <el-radio :label="2" border>女性</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="createModal = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import buttonSearch from "@/components/common/button-search";

export default {
  components: {
    buttonSearch,
  },
  inject: ['app'],
  data() {
    return {
      tableData: [
        {
          id: 1,
          username: "用户名",
          avatar: "xxx",
          level_id: 1,
          level: {
            id: 1,
            name: "普通会员",
          },
          create_time: "2020",
          update_time: "2020",
          status: 1,
        },
      ],
      currentPage: 1,
      createModal: false,
      search: {
        keyword: "",
        group_id: 0,
        time: "",
      },
      form: {
        username: "",
        password: "",
        nickname: "",
        avatar: "",
        level_id: 1,
        phone: "",
        email: "",
        sex: 0,
        status: 1,
      },
      editIndex: -1,
    };
  },
  mounted() {},
  methods: {
    openModal(e) {
      if (!e) {
        this.form = {
          username: "",
          password: "",
          nickname: "",
          avatar: "",
          level_id: 1,
          phone: "",
          email: "",
          sex: 0,
          status: 1,
        };
        this.editIndex = -1;
      } else {
        this.editIndex = e.$index;
        this.form = {
          username: e.row.username,
          password: e.row.password,
          nickname: e.row.nickname,
          avatar: e.row.avatar,
          level_id: e.row.level_id,
          phone: e.row.phone,
          email: e.row.email,
          sex: e.row.sex,
          status: e.row.status,
        };
      }

      this.createModal = true;
    },
    changeStatus(item) {
      item.status = !item.status;
      this.$message({
        message: item.status ? "禁用" : "启用",
        type: "success",
      });
    },
    submit() {
      let msg = "";
      if (this.editIndex === -1) {
        this.form.level = {
            id: 1,
            name: "普通会员",
        }
        this.tableData.unshift(this.form);
        msg = "添加成功";
      } else {
        const item = this.tableData[this.editIndex];
        (item.username = this.form.username),
          (item.password = this.form.password),
          (item.nickname = this.form.nickname),
          (item.avatar = this.form.avatar),
          (item.level_id = this.form.level_id),
          (item.phone = this.form.phone),
          (item.email = this.form.email),
          (item.sex = this.form.sex),
          (item.status = this.form.status);

        msg = "修改成功";
      }

      this.createModal = false;
      this.$message({
        message: msg,
        type: "success",
      });
    },
    deleteItem(scope) {
      this.tableData.splice(scope.$index, 1);
    },
    searchEvent(e = false) {},
    clearSearch() {
      this.form = {
        keyword: "",
        group_id: 0,
        time: "",
      };
      this.advSearch = false;
    },
    chooseImage() {
      this.app.chooseImage((res) => {
        this.form.avatar = res[0].url
      }, 1);
    }
  },
};
</script>

<style lang='scss' scoped>
</style>