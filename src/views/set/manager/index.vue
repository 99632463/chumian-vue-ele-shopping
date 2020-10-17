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
      <el-tab-pane label="管理员列表" name="second">
				<div class="d-flex align-items-center">
        	<el-button type="primary" size="mini">添加管理员</el-button>
					<div class="ml-auto d-flex">
						<el-input v-model="keyword" size="mini" style="width:200px" placeholder="请输入用户名"></el-input>
						<el-button type="info" size="mini" class="ml-2">搜索</el-button>
					</div>
      	</div>
        <el-table border class="mt-3" :data="managerList" style="width: 100%">
          <el-table-column 
            align="center" 
            label="用户头像" 
          >
						<template slot-scope="scope">
							<el-avatar size='large' :src='scope.row.avatar'></el-avatar>
						</template>
          </el-table-column>
          <el-table-column 
						label="用户名" 
						align="center"
						prop='username'
					>
          </el-table-column>
          <el-table-column 
						label="手机号" 
						align="center" 
						prop="phone"
					>
          </el-table-column>
          <el-table-column 
						label="邮箱" 
						align="center" 
						prop="email"
					>
          </el-table-column>
					<el-table-column 
						label="所属管理员" 
						align="center" 
					>
						<template slot-scope="scope">
							{{scope.row.group.name}}
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
              <el-button type="text" size="mini" @click="deleteItem(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="角色列表" name="role">
        <div class="d-flex align-items-center">
        	<el-button type="primary" size="mini" v-auth="'添加角色'">添加角色</el-button>
      	</div>
        <el-table border class="mt-3" :data="groupList" style="width: 100%">
          <el-table-column 
						label="角色名称" 
						align="center"
						prop='name'
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
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="openModal(scope)"
                >修改</el-button
              >
              <el-button type="text" size="mini">配置权限</el-button>
              <el-button type="text" size="mini" @click="deleteItem(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
			<el-tab-pane label="权限列表" name="auth">
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
							<el-input v-if='data.editStatus' v-model="data.label" size="mini" placeholder="请输入内容"></el-input>
							<span v-else>{{ node.label }}</span>
						</div>
						<span>
							<el-button :type="data.status ? 'primary' : 'danger'" size="mini" @click.stop="showOrHide(data)">
								{{data.status ? '显示' : '隐藏' }}
							</el-button>
							<el-button type="success" size="mini" @click="append(data)" v-auth="'添加规则'">增加</el-button>
							<el-button :type="data.editStatus ? 'default' : 'warning'" size="mini" @click="edit(data)">
								{{data.editStatus ? '完成' : '编辑'}}
							</el-button>
							<el-button type="danger" size="mini" @click="remove(node, data)">删除</el-button>
						</span>
					</span>
				</el-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
			keyword: '',
      activeName: "second",
      managerList: [
        {
					id:10,
					username: '用户名',
					avatar: '',
					phone: '15616131656',
					email: '99632463@qq.com',
					group_id: 1,
					group:{
						id:1,
						name: '管理员'
					},
					status: 1
        }
			],
			groupList: [
        {
					id:10,
					name: '超级管理员',
					status: 1
        }
			],
			data: [
        {
          id: 1,
          label: "一级 1",
          editStatus: false,
          status: 1,
          children: [
            {
              id: 2,
              label: "二级 1-1",
              editStatus: false,
              status: 1,
              children: [
                {
                  id: 3,
                  label: "三级 1-1-1",
                  editStatus: false,
                  status: 1,
                },
              ],
            },
          ],
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
	},
  filters:{
    formatType(value){
      let arr = ['按重量', '按件数']
      return arr[value]
    }
	},
	methods:{
		handleNodeClick(data) {
      console.log(data);
    },
    showOrHide(data){
      data.status = data.status ? 0 : 1
    },
    edit(data){
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
        label: 'xxxx',
        status: 1,
        editStatus: true,
        children: []
      }
      data.children.push(newObj)
    },
    nodeDrop(befor, after, inner, event){

    },
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