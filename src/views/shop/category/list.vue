<template>
  <div
    class="bg-white px-3 goods-create"
    style="padding-top: 2px;margin: -20px; margin-top: -4px;margin-bottom: 0 !important"
  >
    <div class="py-2 border-bottom d-flex align-items-center">
      <el-button type="primary" size="mini" @click="createTop">创建顶级分类</el-button>
    </div>

    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-drop='nodeDrop'
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div>
          <el-input v-if='data.editStatus' v-model="data.name" size="mini" placeholder="请输入内容"></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button :type="data.status ? 'primary' : 'danger'" size="mini" @click.stop="showOrHide(data)">
            {{data.status ? '显示' : '隐藏' }}
          </el-button>
          <el-button type="success" size="mini" @click="append(data)">增加</el-button>
          <el-button :type="data.editStatus ? 'default' : 'warning'" size="mini" @click="edit(data)">
            {{data.editStatus ? '完成' : '编辑'}}
          </el-button>
          <el-button type="danger" size="mini" @click="remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "shop-category-list",
  inject: ['layout'],
  data() {
    return {
      data: [],
      defaultProps: {
        children: "child",
        label: "name",
      },
    };
  },
  mounted(){
    this.__init()
  },
  methods: {
    __init(){
      this.layout.startLoading()
      this.axios.get('/admin/category')
        .then(({data}) => {
          let addEditStatus = (data) => {
            data.forEach(item => {
              item.editStatus = false
              if(item.child.length > 0) {
                addEditStatus(item.child)
              }
            })
          }

          addEditStatus(data)
          this.data = data
          this.layout.endLoading()
        })
        .catch(err => {
          this.layout.endLoading()
        })
    },
    handleNodeClick(data) {
      console.log(data);
    },
    showOrHide(data){
      data.status = data.status ? 0 : 1
    },
    edit(data){
      console.log('data: ', data);
      data.editStatus = !data.editStatus
    },
    remove(node, data){
      const parent = node.parent
      const children = parent.data.children || parent.data

      let index = children.findIndex(v => v.id === data.id)
      if(index > -1){
        children.splice(index, 1)
      }
    },
    append(data){
      let newObj = {
        id: 2,
        name: 'xxxx',
        status: 1,
        editStatus: true,
        children: []
      }
      data.child.push(newObj)
    },
    nodeDrop(befor, after, inner, event){

    },
    createTop(){
      this.$prompt('请输入顶级分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(val){
          if(!val){
            return '顶级分类不能为空 ！'
          }
          return true
        }
      })
      .then(({ value }) => {
        console.log('value: ', value);
        
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/deep/ .el-tree-node__content{
  padding: 20px 0 !important;
}
</style>