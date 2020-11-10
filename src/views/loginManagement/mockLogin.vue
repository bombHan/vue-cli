<template>
  <div class="mock-login">
    <div class="layout-header">
      <div class="layout-header-logo">
        <img src="../../assets/images/login-bg.png" />
      </div>
    </div>
    <a-result title="跳转登录中，请稍后..." class="loading">
      <template slot="icon">
        <a-spin size="large" />
      </template>
    </a-result>
    <div id="mapid" style="height: 400px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {
    this.mockLogin()
  },
  methods: {
    mockLogin() {
      const query = this.$route.query;
      console.log(query);
      // setTimeout(() => {
      //   this.$router.push({ path: "/salary/salarymanage/sendsalary" })
      // },2000)
    }
  }
};
</script>

<style lang="less" scoped>
.mock-login {
  padding-top: 60px;
  .layout-header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 12px 1px rgba(42, 54, 70, 0.09);
    display: flex;
    align-items: center;
    .layout-header-logo {
      flex: 1;
      img {
        height: 44px;
        padding: 0 20px;
      }
    }
  }
}
</style>