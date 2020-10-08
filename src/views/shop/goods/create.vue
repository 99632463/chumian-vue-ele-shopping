<template>
  <div
    class="bg-white px-3 goods-create"
    style="margin: -20px; margin-top: -1rem;margin-bottom: 0!important"
  >
    <router-link :to="{name: 'shop_goods'}" style="position:absolute;top:12px;left:200px">
      <el-button size="mini">回到商品列表</el-button>
    </router-link>
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <base-create />
      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格">
            <el-radio-group
              :value="skus_type"
              @input="updateVModelState('skus_type', $event)"
              size="medium"
            >
              <el-radio-button :label="0">单一规格</el-radio-button>
              <el-radio-button :label="1">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 单规格 -->
        <singleAttrs v-if="skus_type === 0" />
        <!-- 多规格 -->
        <someAttrs v-else />
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品类型">
            <el-select :value='goods_type_id' @change="updateVModelState('goods_type_id', $event)" placeholder="请选择商品类型">
              <el-option
                label="区域一"
                value="1111">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品属性</span>
          </div>
          <el-form label-width="80px">
            <el-form-item label="手机型号">
              <el-input :value="goods_attrs.phone_model" @input="vModelGoodsAttr({key: 'phone_model',value: $event})" placeholder="请输入手机型号"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="媒体设置">
        <el-form label-width="80px">
          <el-form-item label="商品大图">
            <div class="d-flex flex-wrap">
              <div 
                class="position-relative border rounded d-flex align-items-center justify-content-center mr-3 mb-3"
                style="width:150px;height:150px;cursor:pointer;"
                v-for="item in banners" :key="item.id"
                @click="chooseImage(index)"
              >
                <img :src="item.url" style="width: 100%; height: 100%;">
                <i @click.stop="deleteImage(index)" style="position:absolute;right:0;top:0;background:rgba(0,0,0,.4)" class="el-icon-delete p-2 text-white"></i>
              </div>
              <div 
                class="border rounded d-flex align-items-center justify-content-center mr-3 mb-3"
                style="width:150px;height:150px;cursor:pointer;"
                @click="chooseImage(-1)"
                v-if="banners.length < 9"
              >
                <i class="el-icon-plus text-muted" style="font-size: 30px;"></i>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情" style="height: 70vh">
        <tinymce v-model="msg" @onClick="onTinymceClick" />
      </el-tab-pane>
      <el-tab-pane label="折扣设置">
        <el-form label-width="80px">
          <el-form-item label="会员价">
            <el-input :value="discount" @input="updateVModelState('discount', $event)">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import baseCreate from "@/components/shop/create/base_create";
import singleAttrs from "@/components/shop/create/single-attrs";
import someAttrs from "@/components/shop/create/some-attrs";
import tinymce from "@/components/common/tinymce";

export default {
  name: "shop-goods-create",
  inject: ['app'],
  components: {
    baseCreate,
    singleAttrs,
    someAttrs,
    tinymce,
  },
  data() {
    return {
      tabIndex: 0,
      msg: "Welcome to Use Tinymce Editor",
    };
  },
  computed: {
    ...mapState("goods_create", {
      skus_type: (state) => state.skus_type,
      banners: (state) => state.banners,
      goods_type_id: (state) => state.goods_type_id,
      goods_attrs: (state) => state.goods_attrs,
      discount: (state) => state.discount,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations("goods_create", ["setVModelState", 'vModelGoodsAttr']),
    updateVModelState(key, value) {
      this.setVModelState({ key, value });
    },
    handleClick() {},
    // 鼠标单击的事件
    onTinymceClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },
    chooseImage(index){
      const max = 9
      const count = 9 - this.banners.length

      this.app.chooseImage((value) => {
        let list = []
        if(index === -1){
          list = [...this.banners, ...value]
        }
        else{
          list = [...this.banners]
          list[index] = value[0]
        }
        this.setVModelState({ key: 'banners', value: list });
      }, index === -1 ? count : 1);
    },
    // 删除大图
    deleteImage(index){
      this.$confirm('您确认要删除该图片吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const list = this.banners
        list.splice(index,1)
        this.setVModelState({ key: 'banners', value: list });
      })
    }
  },
};
</script>

<style lang='scss' scoped>
.goods-create .el-form-item {
  margin-bottom: 15px;
}
</style>