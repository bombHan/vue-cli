<template>
  <a-modal
    :maskClosable="false"
    v-if="visible"
    :visible="visible"
    :title="title"
    @ok="onOk"
    @cancel="onCancel"
    width="720px"
  >
    <div class="member-select">
      <div style="width: 50%;">
        <a-breadcrumb style="flex: none;padding-left: 20px;">
          <a-breadcrumb-item
            :style="index === breadList.length - 1 ? 'cursor: pointer; color: #ccc': 'cursor: pointer; color: #000'"
            v-for="(item, index) in breadList"
            :key="index"
            :class="index === breadList.length - 1 ? 'bread-forbidden' : 'bread'"
          >
            <span @click="changeBread(item)">{{item.name}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
        
        <div class="left">
          <a-spin :spinning="loading">
            <div class="member-list">
              <template>
                <div class="member-item" @click.prevent="selectMember('all')">
                  <a-checkbox :checked="isSelectedAll()">全选</a-checkbox>
                </div>
                <div
                  v-for="(item, index) in memberList"
                  :key="index"
                  class="member-item"
                  @click.prevent="selectMember(item)"
                >
                  <a-checkbox
                    :checked="isSelected(item)"
                    :style="isSelected(item) && item.deptId ? 'color: #ccc': ''"
                  >
                    <qfy-avatar :image="item.img" :name="item.name" v-if="item.qfyAcctId" />
                    {{item.name}}
                    <span v-if="item.deptId && item.number > -1">({{item.number}})</span>
                  </a-checkbox>
                  <div
                    class="lower-level"
                    v-if="item.deptId"
                    @click.stop="changeLevel(item)"
                    :style="isSelected(item) ? 'cursor: not-allowed' : 'cursor: pointer'"
                  >
                    <a-icon type="apartment" class="icon" />下级
                  </div>
                </div>
              </template>
            </div>
          </a-spin>
        </div>
      </div>

      <div class="right">
        <div class="selected-list">
          <div
            class="selected-tag"
            v-for="(item,index) in selectedList"
            :key="index"
            @click="deleteMember(item.id)"
          >
            <span>{{item.name}}</span>
            <span v-if="item.deptId && item.number > -1">({{item.number}})人</span>
            <a-tag color="blue" v-if="item.deptId" style="margin-left: 5px">部门</a-tag>
            <span class="close">×</span>
          </div>
          <a-select
            :loading="findPersonLoading"
            show-search
            :value="inputvalue"
            placeholder="请输入姓名"
            style="width: 105px;margin: 0 10px 10px 0"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
            :dropdownMatchSelectWidth="false"
          >
            <a-select-option v-for="item in filterList" :key="item.id" :item="item">
              <div
                style="display: flex;width: 200px;box-sizing: border-box;height: 55px;align-items: center"
              >
                <qfy-avatar :image="item.img" :name="item.name" v-if="item.qfyAcctId" />
                <div
                  style="height: 55px;margin-left: 10px;display: flex; flex-direction: column; justify-content: space-around"
                >
                  <div style="font-size: 16px;color: #000">{{ item.name }}</div>
                  <div style="font-size: 12px">{{ item.deptName }}</div>
                </div>
              </div>
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import api from "@/api/api";
export default {
  props: {
    defaultSelect: {
      type: Array,
      default: () => [],
      required: false
    },
    visible: {
      type: Boolean,
      default: false,
      required: false
    },
    title: {
      type: String,
      default: "选择员工",
      required: false
    },
    findPersonFunction: {
      // 搜索人接口
      type: String,
      default: "acctFindAccts",
      required: false
    },
    getDeptAcctsFunction: {
      // 获取左边所选部门的人员和子部门
      type: String,
      default: "getDeptAccts",
      required: false
    }
  },
  data() {
    return {
      memberList: [], // 右侧选择列表中的数据
      selectedList: [], // 左侧选中的列表数据结构{name: '111', id: 111, number: 11}
      loading: false, // 左侧加载loading
      inputvalue: undefined, // 输入框
      findPersonLoading: false, // 输入框搜索loading
      filterList: [], // 左侧输入框下拉框列表
      breadList: [] // 面包屑
    };
  },
  created() {
    // 搜人的时候需要做个防抖
    console.log(this.$utils)
    this.findPersonDebounce = this.$utils._debounce(this.findPerson, 500);
    // 初始化赋值默认已选择的人
    if (this.defaultSelect && this.defaultSelect.length > 0) {
      this.selectedList = this.defaultSelect.map(item => {
        if (item.deptId) {
          return {
            ...item,
            id: item.deptId,
            name: item.deptName
          };
        } else {
          return {
            ...item,
            id: item.qfyAcctId,
            name: item.qfyAcctName
          };
        }
      });
    }
    // 这里需要给面包屑赋值初始第一个对象
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.breadList.push({
      ...userInfo,
      deptId: "0",
      deptName: userInfo.entpName,
      id: "0",
      name: userInfo.entpName
    });
    console.log("userInfo", userInfo, "breadList", this.breadList);
    // 再去获取右边的列表
    this.getMemberList();
  },
  methods: {
    isSelected(targetObj) {
      let selected = false;
      this.selectedList.forEach(item => {
        if (item.id === targetObj.id) {
          selected = true;
        }
      });
      return selected;
    },
    isSelectedAll() {
      let selectedAll = true;
      this.memberList.forEach(item => {
        const targetIndex = this.selectedList.findIndex(it => {
          return it.id === item.id;
        });
        if (targetIndex === -1) {
          selectedAll = false;
        }
      });
      return selectedAll;
    },
    handleSearch(value) {
      // 搜索框搜索
      console.log("search", value);
      this.findPersonDebounce(value);
    },
    findPerson(value) {
      // this.findPersonLoading = true;
      // api[this.findPersonFunction]({
      //   acctName: value,
      //   specialShow: "1"
      // })
      //   .then(res => {
      //     console.log(res);
      //     const data = res.data;
      //     this.filterList = data.map(item => {
      //       return {
      //         ...item,
      //         id: item.qfyAcctId,
      //         name: item.qfyAcctName
      //       };
      //     });
      //     this.findPersonLoading = false;
      //   })
      //   .catch(e => {
      //     this.findPersonLoading = false;
      //   });
    },
    handleChange(value, obj) {
      // 搜索框点击选择搜索出来的人员时调用
      console.log(value, obj.data.attrs.item);
      const targetObj = obj.data.attrs.item;
      let canAdd = true;
      this.selectedList.forEach(item => {
        if (item.id === targetObj.id) {
          canAdd = false;
        }
      });
      if (canAdd) {
        this.selectedList.push(targetObj);
      } else {
        this.$message.error("不能重复选择");
      }
      this.inputvalue = "";
      this.filterList = [];
    },
    deleteMember(id) {
      // 删除人员
      this.selectedList = this.selectedList.filter(item => {
        return item.id !== id;
      });
    },
    changeBread(targetObj) {
      // 点击面包屑
      const targetIndex = this.breadList.findIndex(item => {
        return item.id === targetObj.id;
      });
      // console.log(targetIndex);
      if (targetIndex !== this.breadList.length - 1) {
        this.breadList = this.breadList.slice(0, targetIndex + 1);
        this.getMemberList();
      }
    },
    getMemberList() {
      console.log("获取memberList");
      const currentBread = this.breadList[this.breadList.length - 1];
      console.log(currentBread);
      // this.loading = true;
      // api[this.getDeptAcctsFunction]({
      //   deptId: currentBread.deptId
      // })
      //   .then(res => {
      //     console.log(res);
      //     const data = res.data;
      //     const list = data.acctList.concat(data.deptList);
      //     this.memberList = list.map(item => {
      //       if (item.deptId) {
      //         return {
      //           ...item,
      //           id: item.deptId,
      //           name: item.deptName
      //         };
      //       } else {
      //         return {
      //           ...item,
      //           id: item.qfyAcctId,
      //           name: item.qfyAcctName
      //         };
      //       }
      //     });
      //     this.loading = false;
      //   })
      //   .catch(e => {
      //     this.loading = false;
      //   });
    },
    selectMember(targetObj) {
      // 右侧点击radio按钮事件
      if (targetObj !== "all") {
        // 点击具体某个人或者部门
        let isExistence = false;
        const targetIndex = this.selectedList.findIndex(item => {
          return item.id === targetObj.id;
        });
        if (targetIndex !== -1) {
          this.selectedList = this.selectedList.filter(item => {
            return item.id !== targetObj.id;
          });
        } else {
          this.selectedList.push(targetObj);
        }
      } else {
        // 点击全选
        let isSelectedAll = this.isSelectedAll();
        if (isSelectedAll) {
          this.selectedList = this.selectedList.filter(item => {
            const canFind = this.memberList.findIndex(it => {
              return it.id === item.id;
            });
            return canFind === -1;
          });
        } else {
          this.memberList.forEach(item => {
            const canFind = this.selectedList.findIndex(it => {
              return it.id === item.id;
            });
            if (canFind === -1) {
              this.selectedList.push(item);
            }
          });
        }
      }
      console.log(this.selectedList);
    },
    changeLevel(targetObj) {
      // 点击下级
      if (!this.isSelected(targetObj)) {
        this.breadList.push(targetObj);
        console.log(this.breadList);
        this.getMemberList();
      }
    },
    onOk() {
      const personList = this.selectedList.filter(item => {
        return item.qfyAcctId;
      });
      const deptList = this.selectedList.filter(item => {
        return item.deptId;
      });
      console.log(
        "确定,选中的数组",
        this.selectedList,
        "部门数组",
        deptList,
        "人员数组",
        personList
      );
      this.$emit("onOk", this.selectedList, deptList, personList);
    },
    onCancel() {
      console.log("取消");
      this.$emit("onCancel");
    }
  }
};
</script>
<style lang="less" scoped>
.member-select {
  width: 680px;
  height: 490px;
  display: flex;
  .right {
    width: 50%;
    box-sizing: border-box;
    overflow: auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .selected-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .selected-tag {
        margin: 0 10px 10px 0;
        height: 30px;
        padding: 0 10px;
        background: rgb(241, 241, 242);
        border-radius: 4px;
        color: #000;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          background: rgb(231, 232, 232);
        }
        .close {
          font-size: 18px;
        }
      }
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);
    overflow: auto;
    border-right: 1px solid #ccc;
    .bread {
      &:hover {
        color: #1890ff !important;
      }
    }
    .bread-forbidden {
      cursor: not-allowed !important;
    }
    .member-list {
      margin-top: 10px;
      .member-item {
        height: 50px;
        padding: 0 20px;
        position: relative;
        display: flex;
        align-items: center;
        &:hover {
          background: rgb(241, 241, 242);
        }
        .ant-radio-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .lower-level {
          position: absolute;
          right: 0px;
          top: 10px;
          height: 30px;
          display: flex;
          align-items: center;
          padding: 0 20px 0 10px;
          border-left: 1px solid #ccc;
          cursor: pointer;
          &:hover {
            color: #1890ff;
          }
          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>