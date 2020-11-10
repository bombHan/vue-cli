<template>
  <div class="homepage">
    <a-spin :spinning="loading">
      后台首页
      <br /><br />
      store 根state中的wrapper字段值（this.$store.state.wrapper）：{{
        this.$store.state.wrapper
      }}
      <br /><br />
      <a-button @click="changeRoot">store wrapper + 1</a-button>
      <br /><br />
      store modules 中的wrapper字段（this.$store.state.mode.wrapper）：
      {{ this.$store.state.mode.wrapper }}
      <br><br>
      <a-button @click="changeMode">store mode wrapper + 1</a-button>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: "homepage",
  created() {
    console.log("后台首页created", this.$store);
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    changeRoot() {
      this.loading = true;
      setTimeout(() => {
        // this.$store.dispatch('changeWrapper', this.$store.state.wrapper + 1)
        this.$store.commit("changeWrapper", this.$store.state.wrapper + 1);
        this.loading = false;
      }, 500);
    },
    changeMode() {
      // this.$store.dispatch('mode/setMode', this.$store.state.mode.wrapper + 1)
      this.$store.commit("mode/setMode", this.$store.state.mode.wrapper + 1);
    },
  },
};
</script>

<style lang="less" scoped>
.homepage {
  padding: 20px;
  background: #fff;
}
</style>
