import util from '@/common/utils'

export default {
  namespaced: true,
  state: {
    skus_type: 0,
    title: "",
    category: [],
    desc: "",
    unit: "",
    stock: 0,
    min_stock: 0,
    display_stock: "",
    status: "",
    express: "",
    oprice: 0,  // 市场价格
    pprice: 0,  // 销售价格
    cprice: 0,  // 成本价格
    weight: 0,  // 重量
    volume: 0,  // 体积
    sku_card: [
      {
        name: '颜色',
        type: 0, // 规格类型 0 无 1 颜色 2图片
        list: [
          {
            name: '黄色',
            image: '',
            cover: ''
          },
          {
            name: '红色',
            image: '',
            cover: ''
          }
        ]
      },
      {
        name: '颜色',
        type: 0, // 规格类型 0 无 1 颜色 2图片
        list: [
          {
            name: '绿色',
            image: '',
            cover: ''
          },
          {
            name: '紫色',
            image: '',
            cover: ''
          }
        ]
      }
    ],
    // 商品类型
    goods_type_id: "",
    // 商品属性
    goods_attrs: {
      phone_model: ''
    },
    discount: '',
    ths: [
      { name: '商品规格', rowspan: 1, colspan: 1, width: '' },
      { name: 'sku图片', rowspan: 2, colspan: 1, width: '' },
      { name: '销售价', rowspan: 2, colspan: 1, width: '' },
      { name: '市场价', rowspan: 2, colspan: 1, width: '' },
      { name: '成本价', rowspan: 2, colspan: 1, width: '' },
      { name: '库存', rowspan: 2, colspan: 1, width: '' },
      { name: '体积', rowspan: 2, colspan: 1, width: '' },
      { name: '重量', rowspan: 2, colspan: 1, width: '' },
      { name: '编码', rowspan: 2, colspan: 1, width: '' }
    ],
    banners: []
  },
  getters: {
    skuLabels(state){
      return state.sku_card.filter(v => v.list.length)
    },
    tableThs(state, getters) {
      let length = getters.skuLabels.length
      state.ths[0].colspan = length
      state.ths[0].rowspan = length > 0 ? 1 : 2

      return state.ths
    },
    // 获取规格表格数据
    tableData(state) {
      if (state.sku_card.length === 0) {
        return []
      }
      let sku_list = []
      for (let i = 0; i < state.sku_card.length; i++) {
        if (state.sku_card[i].list.length > 0) {
          sku_list.push(state.sku_card[i].list)
        }
      }
      if (sku_list.length === 0) {
        return []
      }
      const arr = util.cartesianProductOf(...sku_list)
      return arr.map(v => {
        const obj = {
          skus: [],
          image: '',
          oprice: 0,  // 市场价格
          pprice: 0,  // 销售价格
          cprice: 0,  // 成本价格
          stock: 0,
          weight: 0,  // 重量
          volume: 0,  // 体积
          code: ''
        }
        obj.skus = v
        return obj
      })
    }
  },
  mutations: {
    setVModelState(state, { key, value }) {
      state[key] = value
    },
    addSkuCard(state) {
      state.sku_card = [
        ...state.sku_card,
        {
          name: '规格名称',
          type: 0,
          list: []
        }
      ]
    },
    delSkuCard(state, index) {
      state.sku_card.splice(index, 1)
    },
    updateSkuCard(state, { index, key, value }) {
      state.sku_card[index][key] = value
    },
    sortSkuCard(state, { action, index }) {
      util[action](state.sku_card, index)
    },
    addSkuValue(state, index) {
      state.sku_card[index].list.push({
        name: '规格名称',
        image: '',
        cover: ''
      })
    },
    delSkuValue(state, { cardIndex, valueIndex }) {
      state.sku_card[cardIndex].list.splice(valueIndex, 1)
    },
    updateSkuValue(state, { cardIndex, valueIndex, key, value }) {
      state.sku_card[cardIndex].list[valueIndex][key] = value
    },
    sortSkuValue(state, { cardIndex, newList }) {
      state.sku_card[cardIndex].list = newList
    },
    vModelGoodsAttr(state, {key,value}){
      state.goods_attrs[key] = value
    }
  },
  actions: {

  }
}