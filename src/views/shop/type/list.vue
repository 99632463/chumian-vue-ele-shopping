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
    <button-search class="pb-1" :showSearch="false">
      <template #left>
        <div class="d-flex align-items-center">
          <el-button size="mini" type="success" @click="openModal(false)"
            >添加规格</el-button
          >
          <el-button size="mini" type="danger" @click="deleteAll"
            >批量删除</el-button
          >
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
      <el-table-column label="类型名称" prop="name"> </el-table-column>
      <el-table-column prop="value" label="属性标签" width="380" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.goods_type_values | filterValueList }}</div>
        </template>
      </el-table-column>
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
            {{ scope.row.status ? "启用" : "禁用" }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="openModal(scope)"
              >修改</el-button
            >
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
          :current-page="page.currentPage"
          :page-sizes="page.sizes"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
        ></el-pagination>
      </div>
    </el-footer>

    <el-dialog
      title="添加类型"
      :visible.sync="createModal"
      top="5vh"
      width="80%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型名称" prop="name">
          <el-input
            style="width: 25%"
            v-model="form.name"
            placeholder="请输入类型名称"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.order"
            :min="0"
            size="mini"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联规格">
          <div class="d-flex">
            <span
              style="line-height: initial"
              class="sku-list-item px-3 py-2 border rounded mr-3"
            >
              <font>颜色</font>
              <i class="el-icon-delete"></i>
            </span>
            <el-button type="primary" size="mini">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="属性列表">
          <el-table :data="value_list" style="width: 100%">
            <el-table-column prop="order" label="排序" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.order" size="mini" placeholder="请选择排序"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="属性名称" width="130">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="mini" placeholder="请选择属性名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="所属类型" width="100">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择所属类型" size="mini">
                  <el-option label="输入框" value="input"></el-option>
                  <el-option label="单选框" value="radio"></el-option>
                  <el-option label="多选框" value="checkbox"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="是否显示" width="80">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" :active-color="1" :inactive-color="0"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="属性值">
              <template slot-scope="scope" v-if="scope.row.type !== 'input'">
                <el-input 
                  type="textarea" 
                  v-model="scope.row.value" 
                  size="mini" 
                  placeholder=""
                  v-if="scope.row.isEdit"
                >
                </el-input>
                <span v-else>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button v-if="scope.row.type !== 'input'" type="text" size="mini" @click="editValue(scope)">
                  {{scope.row.isEdit ? '完成' : '编辑属性值'}}
                </el-button>
                <el-button type="text" size="mini" @click="delRow(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
           <el-button type="text" size="mini" icon='el-icon-plus' @click="addValue">添加一个属性</el-button>
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
import common from '@/common/mixins/common'

export default {
  components: {
    buttonSearch,
  },
  mixins: [common],
  data() {
    return {
      preUrl: 'goods_type',
      tableData: [],
      currentPage: 1,
      createModal: false,
      value_list: [
        {
          order:50,
          name:'属性名称',
          type:'input',
          value:'属性值',
          isEdit:false
        }
      ],
      form: {
        name: "",
        order: 50,
        status: 1,
        sku_list: []
      },
      rules: {
        name: [
          {
            required: true,
            message: "类型名称不能为空",
            trigger: "blur",
          },
        ]
      },
      editIndex: -1,
    };
  },
  filters: {
    filterValueList(list) {
      return list.map((v) => v.name).join(",");
    },
  },
  mounted() {},
  methods: {
    deleteAll() {
      this.multipleSelection.forEach((item) => {
        const index = this.tableData.findIndex((v) => v.id === item.id);
        if (index > -1) {
          this.tableData.splice(index, 1);
        }
      });

      this.multipleSelection = [];
    },
    openModal(e) {
      if (!e) {
        this.form = {
          name: "",
          order: 50,
          status: 1,
          sku_list: []
        };
        this.value_list = []
        this.editIndex = -1;
      } else {
        this.form = {
          ...e.row
        };
        this.value_list = [...e.row.value_list]
        this.editIndex = e.$index;
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
      this.$refs.form.validate((res) => {
        if (res) {
          let msg = "";
          if (this.editIndex === -1) {
            this.tableData.unshift({
              ...this.form,
              value_list: this.value_list
            });
            msg = "添加成功";
          } else {
            const item = this.tableData[this.editIndex];
            item.name = this.form.name;
            item.order = this.form.order;
            item.status = this.form.status;
            item.type = this.form.type;
            item.sku_list = this.form.sku_list;
            item.value_list = this.value_list;
            msg = "修改成功";
          }

          this.createModal = false;
          this.$message({
            message: msg,
            type: "success",
          });
        }
      });
    },
    deleteItem(scope) {
      this.tableData.splice(scope.$index, 1);
    },
    addValue(){
      this.value_list.push({
        order:50,
        name:'',
        type:'input',
        value:'属性值',
        isEdit:false
      })
    },
    editValue(scope){
      scope.row.isEdit = !scope.row.isEdit
    },
    delRow(scope){
      this.value_list.splice(scope.$index, 1)
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