<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="市场价格">
      <el-input
        type="number"
        :value="oprice"
        @input="updateVModelState('oprice', $event)"
        class="w-25"
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input
        type="number"
        :value="pprice"
        @input="updateVModelState('pprice', $event)"
        class="w-25"
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="成本价格">
      <el-input
        type="number"
        :value="cprice"
        @input="updateVModelState('cprice', $event)"
        class="w-25"
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input
        type="number"
        :value="weight"
        @input="updateVModelState('weight', $event)"
        class="w-25"
      >
        <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品体积">
      <el-input
        type="number"
        :value="volume"
        @input="updateVModelState('volume', $event)"
        class="w-25"
      >
        <template slot="append">立方米</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'single-attrs',
  computed:{
    ...mapState('goods_create', {
      oprice: state => state.oprice,
      pprice: state => state.pprice,
      cprice: state => state.cprice,
      weight: state => state.weight,
      volume: state => state.volume,
    })
  },
  methods: {
    ...mapMutations('goods_create', [
      'setVModelState'
    ]),
    updateVModelState(key, value) {
      this.setVModelState({key, value})
    }
  }
};
</script>

<style>
</style>