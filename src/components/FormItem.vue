<template>
  <a-form-item :label="label" :class="className" :colon="false">
    <slot></slot>
  </a-form-item>
</template>

<script>
export default {
  props: ["label", "className"],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.form-inline {
  display: inline-block;
  position: relative;
  .ant-form-item-label {
    width: 100px;
    label {
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .ant-form-item-control-wrapper {
    display: inline-block;
    vertical-align: top;
  }
}
.form-blcok {
  position: relative;
  .ant-form-item-label {
    width: 100px;
    label {
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .ant-form-item-control-wrapper {
    display: inline-block;
    vertical-align: top;
  }
}
</style>
