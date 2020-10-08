<template>
  <el-dialog title="图片管理" :visible.sync="imageModel" width="80%" top="5vh">
    <el-container class="photo position-relative" style="margin: -30px -20px;">
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select
            class="mr-2"
            placeholder="请选择图片排序方式"
            size="medium"
            style="width: 150px"
            v-model="searchForm.order"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input
            class="mr-2"
            size="medium"
            style="width: 150px"
            placeholder="输入相册名称"
            v-model="searchForm.keyword"
          />
          <el-button type="success" size="medium">搜索</el-button>
        </div>
        <!-- <el-button type="warning" size="mini" @click="cancelSelected" v-if="chooseList">取消选中</el-button> -->
      </el-header>
      <el-container>
        <el-aside width="200px" class="bg-white border-right">
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(item, index) in albums"
              :key="index"
              :active="activeIndex === index"
              :item="item"
              :index="index"
              :showOptions='false'
              @change="changeAblum"
            />
          </ul>
        </el-aside>
        <el-container>
          <el-main>
            <el-row :gutter="10">
              <el-col
                :span="24"
                :lg="4"
                :md="6"
                :sm="8"
                v-for="(item, index) in imageList"
                :key="index"
              >
                <el-card
                  shadow="hover"
                  class="box-card mb-3 position-relative"
                  :body-style="{padding: 0}"
                  style="cursor: pointer"
                >
                  <div class="border" :class="{'border-danger': item.isCheck}">
                    <el-tag
                      type="danger"
                      effect="dark"
                      style="position:absolute; right: 0; top: 0"
                      v-if="item.isCheck"
                    >{{item.checkOrder}}</el-tag>
                    <img
                      class="w-100"
                      style="height: 100px"
                      :src="item.url"
                      @click="selectImage(item)"
                    />
                    <div
                      class="w-100 text-white px-1"
                      style="background: rgba(0,0,0,.5); margin-top: -25px; position: absolute;"
                    >
                      <span class="small">{{item.name}}</span>
                    </div>
                    <div class="p-2 text-center">
                      <el-button-group>
                        <el-button
                          @click="editImageInfo(item)"
                          class="p-2"
                          icon="el-icon-edit"
                          size="mini"
                        ></el-button>
                        <el-button
                          @click="imageDel({index})"
                          class="p-2"
                          icon="el-icon-delete"
                          size="mini"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="bg-white border-top d-flex align-items-center px-0" style="z-index:999;">
        <div
          style="width:200px; flex-shrink: 0"
          class="border-right h-100 d-flex align-items-center justify-content-center"
        >
          <el-button-group>
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <div class="flex-1 px-2" style='padding-top: 30px; box-sizing: border-box;'>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>

    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import albumItem from "@/components/images/album-item";

export default {
  components: {
    albumItem,
  },
  data() {
    return {
      imageModel: false,
      callback: null,
      searchForm: {
        order: "",
        keyword: "",
      },
      albums: [],
      activeIndex: 0,
      imageList: [
        {
          id: 1,
          name: "111",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 2,
          name: "222",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 3,
          name: "333",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 4,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 5,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 6,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 7,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 8,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 1,
          name: "111",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 2,
          name: "222",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 3,
          name: "333",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 4,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 5,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 6,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 7,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 8,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 1,
          name: "111",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 2,
          name: "222",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 3,
          name: "333",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 4,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 5,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 6,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 7,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
        {
          id: 8,
          name: "444",
          isCheck: false,
          checkOrder: 0,
          url:
            "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1598784083&t=2113acb0480b03c4e07d4512fb4c5565",
        },
      ],
      chooseList: [],
      currentPage: 1
    };
  },
  props: {
    max: {
      type: Number,
      default: 9
    }
  },
  mounted() {
    this.__init();
  },
  methods: {
    chooseImage(callback){
      callback && (this.callback = callback)
      this.imageModel = true
    },
    confirm() {
      this.callback(this.chooseList);
      this.hide();
    },
    hide() {
      this.imageModel = false;
      this.callback = null;
      this.searchForm = {}

      this.cancelSelected()
    },
    __init() {
      for (let i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: 20,
          order: 0,
        });
      }
    },
    changeAblum(index) {
      this.activeIndex = index;
    },
    editImageInfo(item) {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
      }).then(({ value }) => {
        item.name = value;
        this.$message({
          type: "success",
          message: "修改成功",
        });
      });
    },
    selectImage(item) {
      if (!item.isCheck) {
        if(this.chooseList.length >= this.max){
          return this.$message({
            message: '最多选中' + this.max + '张',
            type: 'warning'
          })
        }
        this.chooseList = [...this.chooseList, { id: item.id, url: item.url }];
        item.checkOrder = this.chooseList.length;
        item.isCheck = true;
        return;
      }
      const current = this.chooseList.findIndex((i) => i.id === item.id);
      if (current === -1) {
        return;
      }

      const length = this.chooseList.length;
      if (current + 1 < length) {
        for (let j = current; j < length; j++) {
          const no = this.imageList.findIndex(
            (v) => v.id === this.chooseList[j].id
          );
          if (no > -1) {
            this.imageList[no].checkOrder--;
          }
        }
      }

      item.isCheck = false;
      item.checkOrder = 0;
      this.chooseList.splice(current, 1);
    },
    imageDel(obj) {
      this.$confirm(
        obj.all ? "是否删除选中的图片?" : "是否删除该图片？",
        "提示",
        {
          type: "warning",
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        }
      ).then(() => {
        if (obj.all) {
          const list = this.imageList.filter((image) => {
            return !this.chooseList.some((item) => item.id === image.id);
          });

          this.imageList = list;
          this.chooseList = [];
        } else {
          this.imageList.splice(obj.index, 1);
        }

        this.$message({
          type: "success",
          message: "删除成功 !",
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    cancelSelected() {
      this.imageList.forEach((image) => {
        let i = this.chooseList.findIndex((item) => item.id === image.id);
        if (i > -1) {
          image.checkOrder = 0;
          image.isCheck = false;
          this.chooseList.splice(i, 1);
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.photo {
  height: 70vh;
  .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
  }
  .el-main {
    position: absolute;
    left: 200px;
    top: 60px;
    right: 0;
    bottom: 0;
  }
}
</style>