<template>
  <div :style="styleStr?styleStr:'padding:20px;'">
    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <span v-for="(item,index) in formList" :key="index">

        <a-form-item v-if="item.type=='input'" :label="item.label">
          <a-input v-decorator="[item.name]" style="width: 200px" placeholder="请输入" allowClear />
        </a-form-item>

        <a-form-item v-else-if="item.type=='select'" :label="item.label">
          <a-select :dropdownMatchSelectWidth="false" v-decorator="[item.name]" style="min-width:174px;">
            <a-select-option v-for="(item2,index2) in item.child" :key="index2" :value="item2.value">{{item2.name}}</a-select-option>
          </a-select>
        </a-form-item>

        <span v-else-if="item.type=='dateRange'">
          <!-- <a-form-item :label="item.label">
            <a-date-picker format="YYYY-MM-DD" v-decorator="['dateRange_'+index+'_0']" />
          </a-form-item>
          <span class="provide">—</span>
          <a-form-item>
            <a-date-picker format="YYYY-MM-DD" v-decorator="['dateRange_'+index+'_1']" />
          </a-form-item> -->
          <a-form-item :label="item.label">
            <a-range-picker style="width: 200px" format="YYYY-MM-DD" v-decorator="['dateRange_'+index]"></a-range-picker>
          </a-form-item>
        </span>
      </span>

      <a-form-item>
        <a-button type="primary" @click="handleSubmit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    formList: {
      type: Array,
      default: []
    },
    styleStr: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "transationFlow" })
    };
  },
  methods: {
    moment,
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = { ...values };

          // for (let i = 0; i < this.formList.length; i++) {
          //   if (this.formList[i].type == "dateRange") {
          //     let time0 = data["dateRange_" + i + "_0"];
          //     let time1 = data["dateRange_" + i + "_1"];
          //     data[this.formList[i].name[0]] = time0
          //       ? time0.format("YYYY-MM-DD")
          //       : "";
          //     delete data["dateRange_" + i + "_0"];
          //     data[this.formList[i].name[1]] = time1
          //       ? time1.format("YYYY-MM-DD")
          //       : "";
          //     delete data["dateRange_" + i + "_1"];
          //   }
          // }

          for (let i = 0; i < this.formList.length; i++) {
            if (this.formList[i].type == "dateRange") {
              let time0 = data["dateRange_" + i]
                ? data["dateRange_" + i][0]
                : undefined;
              let time1 = data["dateRange_" + i]
                ? data["dateRange_" + i][1]
                : undefined;
              data[this.formList[i].name[0]] = time0
                ? time0.format("YYYY-MM-DD")
                : "";
              data[this.formList[i].name[1]] = time1
                ? time1.format("YYYY-MM-DD")
                : "";
              delete data["dateRange_" + i];
            }
          }
          this.$emit("handleSubmit", data);
        }
      });
    }
  }
};
</script>
<style>
.provide {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
  line-height: 32px;
  position: relative;
  top: 4px;
  left: -8px;
  color: #d9d9d9;
}
</style>
