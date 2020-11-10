<template>
  <div class="test">
    后台的test页面
    <br><br>
    store modules 中的wrapper字段（this.$store.state.mode.wrapper）： {{this.$store.state.mode.wrapper}}
    <br><br>
     <a-button @click="changeMode">store mode wrapper + 1</a-button>
  </div>
</template>

<script>
export default {
  name:'test',
  data(){
   return {

   }
  },
  created() {
    console.log('后台test页面created', this.$store)
  },
  methods: {
    changeMode() {
      // this.$store.dispatch('mode/setMode', this.$store.state.mode.wrapper + 1)
      this.$store.commit('mode/setMode', this.$store.state.mode.wrapper + 1)
    }
  }
}
</script>

<style lang="less" scoped>
.test{
  padding: 20px;
  background: #fff;
}
</style>
