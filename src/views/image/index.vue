<template>
  <div>
    <el-container class="photo">
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select
            class="mr-2"
            placeholder="请选择图片排序方式"
            size="medium"
            style="width: 150px"
            v-model="searchForm.order"
          >
            <el-option label="降序" value="desc"></el-option>
            <el-option label="升序" value="asc"></el-option>
          </el-select>
          <el-input
            class="mr-2"
            size="medium"
            style="width: 150px"
            placeholder="输入图片名称"
            v-model="searchForm.keyword"
          />
          <el-button type="success" size="medium" @click="getImagesList">搜索</el-button>
        </div>
        <el-button type="warning" size="mini" @click="cancelSelected" v-if="chooseList">取消选中</el-button>
        <el-button type="danger" size="mini" @click="imageDel({ all:true })" v-if="chooseList">批量删除</el-button>
        <el-button type="success" size="medium" @click="openAlbumModel(false)">创建相册</el-button>
        <el-button type="warning" size="medium" @click="uploadModelVisible = true">上传图片</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" class="bg-white border-right">
          <ul class="list-group list-group-flush">
            <album-item
              showOptions
              v-for="(item, index) in albums"
              :key="index"
              :active="activeIndex === index"
              :item="item"
              :index="index"
              @change="changeAblum"
              @edit="openAlbumModel"
              @del="delAlbum"
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
                          @click="previewImage"
                          class="p-2"
                          icon="el-icon-view"
                          size="mini"
                        ></el-button>
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
      <el-footer class="border-top d-flex align-items-center px-0" style="z-index:999">
        <div
          style="width:200px; flex-shrink: 0"
          class="border-right h-100 d-flex align-items-center justify-content-center"
        >
          <el-button-group>
            <el-button size="mini" :disabled='albumPage === 1' @click="changeAlbumPage('pre')">上一页</el-button>
            <el-button size="mini" :disabled='albumPage === Math.ceil(albumTotalCount / 10)' @click="changeAlbumPage('next')">下一页</el-button>
          </el-button-group>
        </div>
        <div class="flex-1 px-2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>

    <el-dialog :title="albumModelTitle" width="50%" :visible.sync="albumModelVisible">
      <el-form :model="albumForm">
        <el-form-item label="相册名称">
          <el-input
            v-model="albumForm.name"
            size="medium"
            placeholder="请输入相册名称"
            style="width: 500px"
          />
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" size="medium" :min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传图片" width="50%" :visible.sync="uploadModelVisible">
      <el-upload
        class="upload-demo text-center"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from "@/components/images/album-item";
import imageApi from '@/api/image'

export default {
  name: "photo",
  inject: ['layout'],
  components: {
    albumItem,
  },
  data() {
    return {
      searchForm: {
        order: "desc",
        keyword: "",
      },
      albums: [],
      activeIndex: 0,
      albumModelTitle: "",
      uploadModelVisible: false,
      albumModelVisible: false,
      albumEditIndex: -1,
      albumForm: {
        name: "",
        order: 0,
      },
      imageList: [],
      chooseList: [],
      albumPage: 1,
      albumTotalCount: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 10
    };
  },
  mounted() {
    this.__init();
  },
  methods: {
    async __init() {
      this.layout.startLoading()
      const albumData = await imageApi.getImageClass(this.albumPage)
      this.layout.endLoading()
      
      this.albums = albumData.data.list || []
      this.albumTotalCount = albumData.data.totalCount

      this.getImagesList()
    },
    changeAlbumPage(type){
      if(type === 'pre'){
        this.albumPage--
      } else if(type === 'next'){
        this.albumPage++
      }
      this.__init()
    },
    async getImagesList(){
      this.layout.startLoading()
      const imageData = await imageApi.getImageClassList({
        id: this.albums[this.activeIndex].id,
        page: this.currentPage,
        pageSize: this.pageSize,
        order: this.searchForm.order,
        keyword: this.searchForm.keyword
      })
      this.imageList = imageData.data.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          url: item.url,
          isCheck: false,
          checkOrder: 0,
        }
      })

      this.total = imageData.data.totalCount
      this.layout.endLoading()
    },
    changeAblum(index) {
      this.activeIndex = index;
      this.getImagesList()
    },
    delAlbum(index) {
      this.$confirm("您确认要删除此相册吗?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功 !",
        });
        this.albums.splice(index, 1);
      });
    },
    openAlbumModel(obj) {
      if (obj) {
        const { item, index } = obj;
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;
        this.albumModelTitle = "修改相册";

        return (this.albumModelVisible = true);
      }

      this.albumForm = {};
      this.albumModelTitle = "添加相册";
      this.albumEditIndex = -1;
      this.albumModelVisible = true;
    },
    async confirmAlbumModel() {
      // update
      if (this.albumEditIndex > -1) {
        // update
        const item = this.albums[this.albumEditIndex]
        const result = await imageApi.updateImageClass({
          id: item.id,
          data: this.albumForm
        })
        this.__init()
      } else {
        // create
        this.albums = [
          {
            name: this.albumForm.name,
            order: this.albumForm.order,
            num: 0,
          },
          ...this.albums,
        ];
      }

      this.albumModelVisible = false;
    },
    previewImage() {},
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
      this.pageSize = val
      this.getImagesList()
    },
    handleCurrentChange(val) {
      console.log('val: ', val);
      this.currentPage = val
      this.getImagesList()
    },
    cancelSelected() {
      this.imageList.forEach(image => {
        let i = this.chooseList.findIndex(item => item.id === image.id)
        if (i > -1) {
          image.checkOrder = 0
          image.isCheck = false
          this.chooseList.splice(i, 1)
        }
      })
    }
  },
};
</script>

<style lang='scss' scoped>
.photo {
  position: absolute;
  left: 0;
  top: 55px;
  right: 0;
  bottom: 0;
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
  .sum-active {
    color: #67c23a !important;
    background: #f0f9eb !important;
    border-color: #ece7b0 !important;
  }
}
</style>