<template>
  <div class="card mb-3" style="line-height: 1.2">
    <div class="card-header position-relative">
      规格项:
      <el-input
        :value="item.name"
        @input="vModel(cardIndex, 'name', $event)"
        size="mini"
        style="width:200px"
      >
        <el-button slot="append" icon="el-icon-more" @click="chooseSkus"></el-button>
      </el-input>
      <el-radio-group
        :value="item.type"
        @input="vModel(cardIndex, 'type', $event)"
        size="mini"
        style="margin-bottom:-15px"
        class="ml-2"
      >
        <el-radio :label="0">无</el-radio>
        <el-radio :label="1">颜色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
      <span class="position-absolute" style="right: 20px">
        <el-button size="mini" icon="el-icon-top" @click="sortCard('moveUp', cardIndex)"></el-button>
        <el-button size="mini" icon="el-icon-bottom" @click="sortCard('moveDown', cardIndex)"></el-button>
        <el-button size="mini" type="text" @click="delSkuCard(cardIndex)">删除</el-button>
      </span>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center flex-wrap">
        <sku-card-children
          v-for="(item2, index) in item.list"
          :item="item2"
          :type='item.type'
          :cardIndex="cardIndex"
          :valueIndex="index"
          :key="index"
          v-dragging="{ item: item2, list: item.list, group: `skuItem${cardIndex}` }"
        />
      </div>
      <div class="mt-2">
        <el-button type="text" size="mini" icon="el-icon-plus" @click="addSkuValue(cardIndex)">增加规格值</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createLogger, mapMutations } from "vuex";
import skuCardChildren from "@/components/shop/create/sku/sku_card_children";

export default {
  name: "sku_card",
  inject: ['app'],
  components: {
    skuCardChildren,
  },
  props: {
    item: Object,
    cardIndex: Number,
  },
  mounted(){
    this.$dragging.$on('dragend', e => {
      if(e.group === 'skuItem' + this.cardIndex){
        this.sortSkuValue({cardIndex: this.cardIndex, newList: this.item.list})
      }
    })
  },
  methods: {
    ...mapMutations("goods_create", [
      "delSkuCard",
      "updateSkuCard",
      "sortSkuCard",
      "addSkuValue",
      'sortSkuValue'
    ]),
    vModel(index, key, value) {
      this.updateSkuCard({ index, key, value });
    },
    sortCard(action, index) {
      this.sortSkuCard({ action, index });
    },
    chooseSkus(){
      this.app.chooseSkus(res => {
        this.vModel(this.cardIndex, 'name', res.name)
        this.vModel(this.cardIndex, 'type', res.type)
        this.vModel(this.cardIndex, 'list', res.list)
      })
    }
  },
};
</script>

<style>
</style>