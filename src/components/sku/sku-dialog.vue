<template>
  <el-dialog
    title="商品规格选择"
    :visible.sync="createModel"
    width="80%"
    top="5vh"
  >
    <el-container class="photo position-relative" style="margin: -30px -20px">
      <el-container>
        <el-aside width="200px" class="bg-white border-right">
          <ul class="list-group list-group-flush">
            <li
              v-for="(item, index) in skuList"
              :key="index"
              :class="{ 'sum-active': skuIndex === index }"
              class="list-group-item list-group-item-action"
              @click="changeSku(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-aside>
        <el-container>
          <el-header
            class="border-top border-bottom"
            style="
              position: absolute;
              top: 0;
              left: 200px;
              right: 0;
              line-height: 60px;
            "
          >
            <el-button type="primary" size="mini" @click="doChooseAll">
              {{isChooseAllSkuItem ? '取消全选' : '全选'}}
            </el-button>
          </el-header>
          <el-main>
            <div class="flex flex-wrap">
              <span
                class="border rounded py-1 px-2 m-2"
                :class="{'sum-active': item.isCheck}"
                style="cursor: pointer"
                v-for="(item, index) in skuItems"
                :key="index"
                @click="chooseSkuItem(item, index)"
                >{{item.name}}</span
              >
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      createModel: false,
      callback: null,
      chooseList: [],
      skuList: [
        {
          name: "颜色",
          type: 0, // 规格类型 0 无 1 颜色 2图片
          list: [
            {
              id: 1,
              name: "黄色",
              image: "",
              cover: "",
              isCheck: false
            },
            {
              id: 2,
              name: "红色",
              image: "",
              cover: "",
              isCheck: false
            },
          ],
        },
        {
          name: "颜色",
          type: 0, // 规格类型 0 无 1 颜色 2图片
          list: [
            {
              id: 3,
              name: "xl",
              image: "",
              cover: "",
              isCheck: false
            },
            {
              id: 4,
              name: "xll",
              image: "",
              cover: "",
              isCheck: false
            },
          ],
        },
      ],
      skuIndex: 0
    };
  },
  mounted() {},
  computed: {
    skuItems(){
      return this.skuList[this.skuIndex].list
    },
    isChooseAllSkuItem(){
      return this.chooseList.length === this.skuItems.length
    }
  },
  watch:{
    chooseList(newVal){
      // console.log('newVal: ', newVal);
    }
  },
  methods: {
    doChooseAll(){
      const list = this.skuList[this.skuIndex].list
      if(this.isChooseAllSkuItem){
        return this.unChooseAll()
      }
      this.chooseList = list.map(v => v.isCheck = true)
    },
    unChooseAll(){
      const list = this.skuList[this.skuIndex].list
      
      list.forEach(v => v.isCheck = false)
      return this.chooseList = []
    },
    chooseSkuItem(item, index){
      if(!item.isCheck){
        this.chooseList.push(item)
        return item.isCheck = true
      }

      this.chooseList = this.chooseList.filter((v, i) => i !== index)
      item.isCheck = false
    },
    changeSku(index){
      this.skuIndex = index
      this.unChooseAll()
    },
    chooseSkus(callback) {
      callback && (this.callback = callback);
      this.createModel = true;
    },
    confirm() {
      const item = this.skuList[this.skuIndex]
      this.callback({
        name: item.name,
        type: item.type,
        list: this.chooseList
      });
      this.hide();
    },
    hide() {
      this.unChooseAll()
      this.createModel = false;
      this.callback = null;
      this.searchForm = {};
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
    top: 0;
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
.sum-active {
  background: #ccc;
  color: green;
}
</style>