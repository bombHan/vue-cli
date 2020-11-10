<template>
  <a-pagination
    class="qfy-pager"
    v-model="currentPage"
    :total="dataTotal"
    :showTotal="(total) => `共 ${dataTotal} 条`"
    showSizeChanger
    showQuickJumper
    @change="pagerChange"
    @showSizeChange="sizeChange"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "qfy"
    },
    fields: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pageTotal: 0,
      dataTotal: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    this.getList();
  },
  watch: {
    fields() {
      this.currentPage = 1;
      this.pageTotal = 0;
      this.dataTotal = 0;
      this.getList();
    }
  },
  methods: {
    sizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getList();
    },
    pagerChange(page, pageSize) {
      this.currentPage = page;
      this.getList();
    },
    getList() {
      if (this.type === "qfy") {
        this.api[this.url]({
          page: this.currentPage,
          pageSize: this.pageSize,
          ...this.fields
        }).then(res => {
          this.$emit("getPagerData", res.data.list);
          this.pageTotal = res.data.page.pageTotal;
          this.currentPage = res.data.page.currentPage;
          this.dataTotal = res.data.page.dataTotal;
        });
      } else {
        this.api
          .intelligence(
            {
              page: this.currentPage,
              pageSize: this.pageSize,
              totalRecord: this.dataTotal ? this.dataTotal : "",
              item: {
                ...this.fields
              }
            },
            {
              reqUrl: this.url
            }
          )
          .then(res => {
            this.$emit("getPagerData", res.object.list);
            this.pageTotal = res.object.totalPage;
            this.currentPage = res.object.page;
            this.dataTotal = res.object.totalRecord;
          });
      }
    }
  }
};
</script>
