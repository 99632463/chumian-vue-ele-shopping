<template>
  <section>
    <el-form ref="form" label-width="80px">
      <el-form-item label="添加规格">
        <sku-card
          v-for="(item, index) in sku_card"
          :key="index"
          :item="item"
          :cardIndex="index"
        />
        <el-button type="success" size="mini" @click="addSkuCard"
          >添加规格</el-button
        >
      </el-form-item>
    </el-form>
    <el-form ref="form" label-width="80px">
      <el-form-item label="批量设置">
        <template v-if="!updateAllStatus">
          <el-button @click="openUpdateAllStatus(item)" type="text" v-for="(item, index) in updateList" :key="index">
            {{item.name}}
          </el-button>
        </template>

        <div class="d-flex align-items-center" v-else>
          <el-input
            type="number"
            class="mr-2"
            style="width: 150px"
            size="small"
            :placeholder="updateAllPlaceholder"
            v-model="updateAllValue"
          ></el-input>
          <el-button type="primary" size="mini" @click="updateAllSubmit">设置</el-button>
          <el-button size="mini" @click="closeUpdateAllStatus">取消</el-button>
        </div>
      </el-form-item>
      <el-form-item label="规格设置">
        <sku-table ref="table" />
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import skuCard from "@/components/shop/create/sku/sku_card";
import skuTable from "@/components/shop/create/sku_table";

export default {
  name: "some-attrs",
  data(){
    return {
      updateAllStatus: false,
      updateList: [
        {name: '销售价', key:'pprice'},
        {name: '市场价', key:'oprice'},
        {name: '成本价', key:'cprice'},
        {name: '库存', key:'stock'},
        {name: '体积', key:'volume'},
        {name: '重量', key:'weight'}
      ],
      updateAllPlaceholder: '',
      updateAllValue: ''
    }
  },
  components: {
    skuCard,
    skuTable,
  },
  computed: {
    ...mapState("goods_create", {
      sku_card: (state) => state.sku_card,
    }),
  },
  methods: {
    ...mapMutations("goods_create", ["addSkuCard"]),
    openUpdateAllStatus(item){
      this.updateAllStatus = item.key
      this.updateAllPlaceholder = item.name
    },
    closeUpdateAllStatus(){
      this.updateAllStatus = false
      this.updateAllValue = ''
    },
    updateAllSubmit(){
      this.$refs.table.list.forEach(item => {
        item[this.updateAllStatus] = this.updateAllValue
      })
      this.closeUpdateAllStatus()
    }
  },
};
</script>

<style>
</style>