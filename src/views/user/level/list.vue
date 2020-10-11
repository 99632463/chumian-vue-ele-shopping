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
      <template #left>
        <div class="d-flex align-items-center">
          <el-button size="mini" type="success" @click="openModal(false)"
            >添加会员等级</el-button
          >
        </div>
      </template>
      <template #right>
        <div>
          <small class="mr-2">选择升级标准: </small>
          <el-radio-group v-model="level" size="mini">
            <el-radio-button :label="0">累计消费</el-radio-button>
            <el-radio-button :label="1">累计次数</el-radio-button>
          </el-radio-group>
        </div>
      </template>
    </button-search>

    <el-table border class="mt-3" :data="tableData" style="width: 100%">
      <el-table-column 
        align="center" 
        label="会员等级"
        prop="name"
      >
      </el-table-column>
      <el-table-column label="升级条件" width="250" align="center">
        <template slot-scope="scope">
          {{ getLevel.name + ':' + scope.row[getLevel.value] }}
        </template>
      </el-table-column>
      <el-table-column 
        label="折扣率(%)" 
        align="center"
        prop="discont"
      >
      </el-table-column>
      <el-table-column 
        label="等级序号" 
        align="center"
        prop="level"
      >
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

    <el-dialog title="添加等级" :visible.sync="createModal" top="5vh">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="等级名称" prop="name">
          <el-input
            style="width: 25%"
            v-model="form.name"
            placeholder="请输入等级名称"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="等级权重" prop="level">
          <el-input
            type="number"
            style="width: 25%"
            v-model="form.level"
            placeholder="请输入等级权重"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="升级条件">
          <div>
            <small class="mr-2">累计消费满</small>
            <el-input style="width:25%" type="number" size="mini" v-model="form.consume" placeholder="累计消费">
              <span slot="append">元</span>
            </el-input>
          </div>
          <div>
            <small class="mr-2">累计次数满</small>
            <el-input style="width:25%" type="number" size="mini" v-model="form.times" placeholder="累计次数">
              <span slot="append">次</span>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="折扣率(%)" size="mini">
          <el-input style="width: 25%" size="mini" type="number" v-model="form.discont" placeholder="折扣率">
            <span slot="append">%</span>
          </el-input>
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
      level: 0,
      tableData: [
        {
          id: 1,
          name: '普通会员',
          consume: 100,
          times: 10,
          discont: 10,
          level: 1,
          status: 1,
          create_time: ''
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
        name:'',
        consume: 0,
        times:0,
        discont:0,
        level:0,
        status:1
      },
      editIndex: -1,
    };
  },
  computed:{
    getLevel(){
      let arr = [
        {name: '累计消费', value: 'consume'},
        {name: '累计次数', value: 'times'}
      ]
      return arr[this.level]
    }
  },
  methods: {
    openModal(e) {
      if (!e) {
        this.form = {
          name:'',
          consume: 0,
          times:0,
          discont:0,
          level:0,
          status:1
        };
        this.editIndex = -1;
      } else {
        this.editIndex = e.$qs;
        this.form = {
          name: e.row.name,
          consume: e.row.consume,
          times: e.row.times,
          discont: e.row.discont,
          level: e.row.level,
          status: e.row.status
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
        this.tableData.unshift(this.form);
        msg = "添加成功";
      } else {
        const item = this.tableData[this.editIndex]
        
        item.name = this.form.name,
        item.consume = this.form.consume,
        item.times = this.form.times,
        item.discont = this.form.discont,
        item.level = this.form.level,
        item.status = this.form.status

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