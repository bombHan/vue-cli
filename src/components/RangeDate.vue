<template>
  <!-- <a-range-picker
    class="qfy-range-date"
    :default-value="start&&end?[moment(start, dateFormat), moment(end, dateFormat)]:null"
    :format="dateFormat"
    @change="onChange"
  />-->

  <a-range-picker
    class="qfy-range-date"
    v-decorator="['_range_date',{initialValue:bot.initialValue?[moment(bot.initialValue[0], dateFormat), moment(bot.initialValue[1], dateFormat)]:null}]"
    :format="dateFormat"
    @change="onChange"
  />
</template>

<script>
import moment from "moment";
export default {
  props: ["bot"],
  data() {
    return {
      dateFormat: "YYYY-MM-DD"
    };
  },
  created() {
    console.log(this.bot);
  },
  methods: {
    moment,
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    }
  }
};
</script>
<style lang="less">
.qfy-range-date {
  .ant-input {
    border: none;
    background-color: transparent;
    padding: 0;
    .ant-calendar-range-picker-input {
      background-color: #fff;
      border: 1px solid #d9d9d9;
      padding: 4px 11px;
      width: 46%;
      border-radius: 4px;
    }
    .ant-calendar-range-picker-separator {
      line-height: 32px;
      width: 8%;
      text-align: center;
    }
  }
  .ant-input:focus {
    box-shadow: none;
  }
}
.qfy-range-date.ant-calendar-picker:focus .ant-input {
  box-shadow: none;
}
</style>
