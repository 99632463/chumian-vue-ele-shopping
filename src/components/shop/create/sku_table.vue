<template>
  <table class="table table-sm table-bordered">
    <thead>
      <tr align="center">
        <th
          v-for="(item, index) in tableThs"
          :key="index"
          :rowspan="item.rowspan"
          :colspan="item.colspan"
          style="vertical-align: middle"
        >{{item.name}}</th>
      </tr>
      <tr align="center">
        <th v-for="(item, index) in skuLabels" :key="index">{{item.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in list" :key="index">
        <td align="center" v-for="(item2, index2) in item.skus" :key="index2">{{item2.name}}</td>
        <td align="center" width="100">
          <span v-if="!item.image" @click="chooseImage(item)" class="btn btn-light border">
            <i class="el-icon-plus"></i>
          </span>
          <img
            v-else
            :src="item.image"
            class="rounded"
            width="45"
            height="45"
            style="cursor:poineter"
            @click="chooseImage(item)"
          />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.pprice" class="form-control text-center" />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.oprice" class="form-control text-center" />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.cprice" class="form-control text-center" />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.stock" class="form-control text-center" />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.volume" class="form-control text-center" />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.weight" class="form-control text-center" />
        </td>
        <td align="center" width="100">
          <input type="number" v-model="item.code" class="form-control text-center" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "sku_table",
  inject: ["app"],
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters("goods_create", ["tableThs", "tableData", "skuLabels"]),
    ...mapState("goods_create", {
      sku_card: (state) => state.sku_card,
    }),
  },
  watch: {
    tableData(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.list = this.tableData;
      }
    },
  },
  mounted() {
    this.list = this.tableData;
  },
  methods: {
    chooseImage(item) {
      this.app.chooseImage((res) => {
        item.image = res[0].url;
      }, 1);
    },
  },
};
</script>

<style>
</style>