<template>
  <div class="bg-white px-3" style="padding-top:10px;margin: -20px; margin-top: -4px;margin-bottom: 0 !important">
    <button-search class="pb-1" :showSearch='false'>
      <template #left>
        <div class="d-flex align-items-center">
          <el-button size="mini" type="success" @click="openModal(false)">添加规格</el-button>
          <el-button size="mini" type="danger" @click="deleteAll">批量删除</el-button>
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
        label="规格名称" 
        prop="name"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="规格值"
        width="380"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="order"
        label="排序"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'success' : 'danger'"
            size="mini"
            plain
            @click="changeStatus(scope.row)"
            >
              {{scope.row.status ? '启用' : '禁用'}}
            </el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" plain @click="openModal(scope)">修改</el-button>
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

    <el-dialog
      title="添加规格"
      :visible.sync="createModal"
      top="5vh"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="规格名称" prop="name">
          <el-input style="width:25%" v-model="form.name" placeholder="请输入规格名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" :min="0" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type" size="mini">
            <el-radio :label="0" border>文字</el-radio>
            <el-radio :label="1" border>颜色</el-radio>
            <el-radio :label="2" border>图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="value">
          <el-input 
            type="textarea" 
            :rows="3" 
            placeholder="一行为一个规格项，多个规格项用换行输入"
            v-model="form.value"
          >
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
  data() {
    return {
      tableData: [
        {
          id: 1,
          name:'颜色',
          value:'棕色，蓝色',
          order:50,
          status:1,
          type: 0
        },
        {
          id: 2,
          name:'颜色',
          value:'棕色，蓝色',
          order:50,
          status:1,
          type: 0
        }
      ],
      currentPage: 1,
      multipleSelection: [],
      createModal: false,
      form:{
        name:'',
        order:50,
        status:1,
        type:0,
        value:''
      },
      rules: {
        name: [
          {
            required: true,
            message: '规格名称不能为空',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: '规格值不能为空',
            trigger: 'blur'
          }
        ]
      },
      editIndex: -1
    };
  },
  mounted() {

  },
  methods: {
    deleteAll(){
      this.multipleSelection.forEach((item) => {
        const index = this.tableData.findIndex(v => v.id === item.id)
        if(index > -1){
          this.tableData.splice(index, 1)
        }
      })

      this.multipleSelection = []
    },
    openModal(e){
      if(!e){
        this.form = {
          name:'',
          order:50,
          status:1,
          type:0,
          value:''
        }
        this.editIndex = -1
      }
      else {
        this.editIndex = e.$index
        this.form = {
          name: e.row.name,
          order: e.row.order,
          status: e.row.status,
          type: e.row.type,
          value: e.row.value
        }
      }
      
      this.createModal = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeStatus(item) {
      item.status = !item.status
      this.$message({
        message: item.status ? '禁用' : '启用',
        type: 'success'
      })
    },
    submit(){
      this.$refs.form.validate(res => {
        if(res){
          let msg = ''
          if(this.editIndex === -1){
            this.form.value = this.form.value.replace(/\n/, ',')
            this.tableData.unshift(this.form)
            msg = '添加成功'
          } else {
            const item = this.tableData[this.editIndex]
            item.name = this.form.name
            item.order = this.form.order
            item.status = this.form.status
            item.type = this.form.type
            item.value = this.form.value
            msg = '修改成功'
          }

          this.createModal = false
          this.$message({
            message: msg,
            type: 'success'
          })
        }
      })
    },
    deleteItem(scope){
      this.tableData.splice(scope.$index, 1)
    }
  },
};
</script>

<style lang='scss' scoped>
</style>