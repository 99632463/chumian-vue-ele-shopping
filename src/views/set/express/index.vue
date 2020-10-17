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
    <el-tabs v-model="activeName">
      <el-tab-pane label="运费模板" name="second">
        <div>
          <el-button type="primary" size="mini">添加模板</el-button>
        </div>
        <el-table border class="mt-3" :data="tableData" style="width: 100%">
          <el-table-column 
            align="center" 
            label="模板名称" 
            prop="name"
          >
          </el-table-column>
          <el-table-column label="升级条件" width="250" align="center">
            <template slot-scope="scope">
              {{ scope.row.type | formatType }}
            </template>
          </el-table-column>
          <el-table-column label="排序" align="center" prop="order">
          </el-table-column>
          <el-table-column label="添加时间" align="center" prop="create_time">
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
      </el-tab-pane>
      <el-tab-pane label="物流跟踪" name="third">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="快递100 Customer">
            <el-input
              v-model="form.customer"
              size="mini"
              style="width: 50%"
              placeholder="快递100 Customer"
            ></el-input>
          </el-form-item>
          <el-form-item label="快递100 key">
            <el-input
              v-model="form.key"
              size="mini"
              style="width: 50%"
              placeholder="密钥"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        customer: "",
        key: "",
      },
      activeName: "second",
      tableData: [
        {
          name: '全国统一邮费',
          type: 1,
          create_time: '2020',
          status: 1,
          order: 100
        }
      ]
    };
  },
  filters:{
    formatType(value){
      let arr = ['按重量', '按件数']
      return arr[value]
    }
  }
};
</script>

<style lang='scss' scoped>
</style>