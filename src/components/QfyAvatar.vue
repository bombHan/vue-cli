<template>
  <span>
    <a-avatar
      v-if="image"
      :src="image"
      :style="`width: 40px;height: 40px;${styles}`"
      :shape="shape"
    />
    <a-avatar
      v-else
      :shape="shape"
      :style="`color: #fff; backgroundColor: rgb(50,150,250);width: 40px;height: 40px;line-height: 40px;${styles}`"
    >{{showName}}</a-avatar>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: "无"
    },
    image: {
      type: String,
      required: false,
      default: ""
    },
    styles: {
      type: String,
      required: false,
      default: ""
    },
    shape: {
      type: String,
      required: false,
      default: 'circle'
    }
  },
  data() {
    return {};
  },
  computed: {
    showName() {
      const name = this.name;
      let showName = name
      if(name.length > 2) {
        showName = name.substring(name.length - 2,name.length)
      }
      return showName
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
