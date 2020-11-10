<template>
  <div>
    <a-form layout="inline" :form="form" @submit="submit">
      <span v-for="item in fields" :key="item.label">
        <a-form-item v-if="item.type=='isInput'" :label="item.label">
          <a-input v-decorator="[item.name,{initialValue:item.initialValue}]" allowClear />
        </a-form-item>

        <a-form-item v-else-if="item.type=='isSelect'" :label="item.label">
          <a-select
            v-decorator="[item.name,{initialValue:item.initialValue}]"
            style="min-width:184px;"
            allowClear
          >
            <a-select-option
              v-for="itm in item.options"
              :key="itm.value"
              :value="itm.value"
            >{{itm.label}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-else-if="item.type=='isRangeDate'" :label="item.label">
          <a-range-picker
            class="qfy-range-date"
            v-decorator="[item.name.join('-'),{initialValue:item.initialValue?[moment(item.initialValue[0], dateFormat), moment(item.initialValue[1], dateFormat)]:null}]"
            :format="dateFormat"
            allowClear
          />
        </a-form-item>
      </span>

      <a-form-item>
        <a-button type="primary" @click="submit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    fields: {
      type: Array,
      default: () => [
        {
          type: "isInput",
          name: "name",
          label: "姓名",
          initialValue: "me"
        },
        {
          type: "isSelect",
          name: "gender",
          label: "性别",
          initialValue: "1",
          options: [
            {
              label: "男",
              value: "1"
            },
            {
              label: "女",
              value: "2"
            }
          ]
        },
        {
          type: "isRangeDate",
          name: ["timestart", "timeend"],
          label: "日期",
          initialValue: ["2015-1-1", "2020-12-31"]
        },
        {
          type: "isRangeDate",
          name: ["timestart1", "timeend2"],
          label: "日期2",
          initialValue: ["2015-1-1", "2020-12-31"]
        }
      ]
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: "Filter"
      }),
      dateFormat: "YYYY-MM-DD"
    };
  },
  methods: {
    moment,
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = {};
          for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (field.type === "isRangeDate") {
              let key = field.name.join("-");
              if (values[key] && values[key].length) {
                data[field.name[0]] = values[key][0].format("YYYY-MM-DD");
                data[field.name[1]] = values[key][1].format("YYYY-MM-DD");
              }
            } else {
              if (values[field.name]) {
                data[field.name] = values[field.name];
              }
            }
          }
          this.$emit("getFieldData", data);
        }
      });
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
