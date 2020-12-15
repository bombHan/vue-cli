<!-- 表格头部组件（查询+筛选) -->
<template>
  <div class="top">
    <div class="top1">
      <div>
        <a-form-model :model="formModel">
          <a-form-model-item>
            <a-input default-value="mysite" v-model="formModel.queryText">
              <a-select
                slot="addonBefore"
                style="width: 90px"
                v-model="formModel.queryType"
              >
                <a-select-option
                  :value="item.name"
                  v-for="(item, index) in topData.selectList"
                  :key="index"
                >
                  {{ item.text }}
                </a-select-option>
              </a-select>
              <a-button type="primary" slot="addonAfter" @click="searchSubmit">
                <a-icon type="search" :style="{ color: '#fff' }" />
              </a-button>
            </a-input>
          </a-form-model-item>
          <template v-if="topData.tabList">
            <a-form-model-item
              :label="item.tit"
              v-for="(item, index) in topData.tabList"
              :key="index"
              class="formItem2"
            >
              <a-radio-group v-model="formModel[item.name]">
                <a-radio-button
                  :value="item"
                  v-for="(item, index) in item.list"
                  :key="index"
                >
                  {{ item }}
                </a-radio-button>
              </a-radio-group>
            </a-form-model-item>
          </template>
        </a-form-model>

        <a-popover placement="bottom" trigger="click">
          <template slot="content">
            <div class="search">
              <Search
                :changeImmediate="true"
                :formList="topData.filterList"
                @prevHandleSubmit="prevHandleSubmit"
                @filterSubmit="searchSubmit"
              ></Search>
            </div>
          </template>
          <div class="searchButton">
            <a-icon type="filter" theme="filled" />
            <div style="width: 50px">筛选</div>
          </div>
        </a-popover>
      </div>
      <slot name="topButton"></slot>
    </div>
  </div>
</template>

<script>
import Search from "@/components/SearchTool/search";
export default {
  props: ["topData"],
  // props: {
  //   type: Object,
  //   default: () => {
  //     return {
  //       selectList: [
  //         {
  //           name: "customName",
  //           text: "客户名称",
  //         },
  //         {
  //           name: "customType",
  //           text: "客户类型",
  //         },
  //       ],
  //       tabList: [
  //         {
  //           tit: "数据标签",
  //           list: ["全部", "即将失效", "待回款", "回款已完成"],
  //         },
  //         {
  //           tit: "数据类型",
  //           list: ["全部", "即将失效", "待回款", "回款已完成"],
  //         },
  //       ],
  //       topButtonList: [
  //         {
  //           icon: "form",
  //           text: "按钮1",
  //         },
  //         {
  //           icon: "form",
  //           text: "按钮2",
  //         },
  //       ],
  //       filterList: [
  //         {
  //           name: "input",
  //           type: "input",
  //           label: "inputName",
  //           placeholder: "嘿嘿嘿",
  //         },
  //         {
  //           type: "select",
  //           name: "select",
  //           label: "selectName",
  //           options: [
  //             { id: "五个字长度", key: "select1" },
  //             { id: "1", key: "select2" },
  //           ],
  //           optionValue: "key",
  //           optionLabel: "id",
  //         },
  //       ],
  //     };
  //   },
  // },
  data() {
    return {
      tabIndex: 0,
      formModel: {
        //搜索框表单数据
        queryType: this.topData.selectList[0].name,
        queryText: "",
        // dataLabel:'',
        // dataType:''
      },
      filterForm: {}, //筛选表单数据
    };
  },
  components: {
    Search,
  },
  watch: {},
  created() {},
  mounted() {
    for (let i in this.topData.tabList) {
      this.$set(
        this.formModel,
        this.topData.tabList[i].name,
        this.topData.tabList[i].list[0]
      );
    }
  },
  methods: {
    tab(val, index) {
      this.formModel.myValue = val;
      this.tabIndex = index;
      this.searchSubmit();
    },
    //筛选条件变化时
    prevHandleSubmit(values) {
      //随时接收筛选表单数据
      this.filterForm = {
        ...values,
      };
      // console.log("search组件------------", values);
    },
    //筛选提交时/搜索提交时
    searchSubmit() {
      this.filterForm = {
        ...this.filterForm,
        ...this.formModel, //写在后面，确保数据更新
      };
      this.$emit("getFilterData", this.filterForm);
    },
  },
};
</script>

<style lang='less'>
.search {
  width: 650px;
}

.top {
  position: relative;
  background-color: #fff;

  .top1 {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    div {
      display: flex;
      align-items: flex-start;
      .ant-input,
      .ant-input-group-addon {
        border-color: #1890ff !important;
      }
      .ant-input {
        border-left: 1px solid #ccc !important;
      }
      .ant-form-item {
        margin-bottom: 0;
      }
      .ant-form-item.formItem2 {
        height: 30px;
        display: flex;
        align-items: center;
        .ant-radio-button-wrapper {
          padding: 0 10px;
          line-height: 32px;
          border: none;
          box-shadow: none;
          outline: none;
          background-color: transparent;
        }
        .ant-radio-button-wrapper:not(:first-child)::before {
          width: 0;
          box-shadow: none;
        }
        .ant-col.ant-form-item-label {
          label {
            height: 32px;
            line-height: 32px;
          }
        }
      }
      .ant-input-group-wrapper {
        width: 500px !important;
        .ant-input-group-addon {
          .ant-select {
            width: 100px !important;
          }
          .anticon.anticon-search {
            width: 30px !important;
          }
        }
        .ant-input-group-addon:nth-of-type(2) {
          padding: 0;
          .ant-btn.ant-btn-primary {
            height: 30px;
            border-radius: 0 3px 3px 0;
          }
        }
      }
      .searchButton {
        display: flex;
        align-items: center;
        position: absolute;
        left: 500px;
        height: 40px;
        .anticon-filter {
          margin: 0 10px;
        }
      }
    }
    .topbutton {
      margin-top: 5px;
      .ant-btn {
        border: none;
        box-shadow: none;
      }
      button[ant-click-animating-without-extra-node]:after {
        border: 0 none;
        opacity: 0;
        animation: none 0 ease 0 1 normal;
      }
    }
  }
}
</style>