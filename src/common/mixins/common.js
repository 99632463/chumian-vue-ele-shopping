export default {
  inject: ['layout'],
  data(){
    return {
      preUrl: '',
      page: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 1,
        limit: 10,
        total: 0
      },
      multipleSelection: [],
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getListData(data) {
      this.tableData = data.list
    },
    getListUrl(){
      return `/admin/${this.preUrl}/${this.page.currentPage}?limit=${this.page.limit}`
    },
    getList() {
      if (this.preUrl === '') return

      this.layout.startLoading()
      this.axios.get(this.getListUrl())
        .then(res => {
          this.getListData(res.data)
          this.page.total = res.data.totalCount
          this.layout.endLoading()
        })
        .catch(err => {
          this.layout.endLoading()
        })
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}