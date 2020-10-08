<template>
  <div class="border py-1 px-2 rounded mr-2 position-relative d-flex align-items-center">
    <div v-if="type !== 0">
      <el-color-picker size="mini" v-if="type === 1" v-model="item.color" @change="changeColor"></el-color-picker>
      <template v-else>
        <span v-if="!item.image" @click="chooseImage" class="btn btn-light border">
          <i class="el-icon-plus"></i>
        </span>
        <img
          v-else
          :src="item.image"
          class="rounded"
          width="45"
          height="45"
          style="cursor:poineter"
          @click="chooseImage"
        />
      </template>
    </div>
    <input
      type="text"
      :value="item.name"
      @input="vModel('name', $event.target.value)"
      class="form-control text-center"
      style="width:80px;font-size:15px;border:0"
    />
    <span
      @click="delSkuValue({cardIndex, valueIndex })"
      class="btn btn-light p-0 position-absolute"
      style="line-height:1;right:-10px;top:-10px"
    >
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "sku-card-children",
  inject: ["app"],
  props: {
    item: Object,
    type: Number,
    cardIndex: Number,
    valueIndex: Number,
  },
  methods: {
    ...mapMutations("goods_create", ["delSkuValue", "updateSkuValue", 'vModelGoodsAttr']),
    vModel(key, value) {
      this.updateSkuValue({
        cardIndex: this.cardIndex,
        valueIndex: this.valueIndex,
        key,
        value,
      });
    },
    chooseImage() {
      this.app.chooseImage((res) => {
        this.vModel("image", res[0].url);
      }, 1);
    },
    changeColor(){
      this.vModel("color", e);
    }
  },
};
</script>

<style>
</style>