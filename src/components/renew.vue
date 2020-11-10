<template>
  <div>
    <a-modal
      :width="1000"
      title="选择帐号"
      v-if="renewModal"
      :visible="renewModal"
      @ok="renewModalOk"
      @cancel="renewModalCancel"
    >
      <TableFilter
        styleStr="padding:0 0 20px;"
        @handleSubmit="filterFun"
        :formList="filterFieldList"
      />
      <div class="renew-modal">
        <div class="renew-left">
          <a-table
            class="renew-table"
            :rowSelection="{ onChange: onSelectChange, selectedRowKeys:selectedRowKeys }"
            :columns="columns"
            :dataSource="dataList"
            :rowKey="record => JSON.stringify(record)"
            :pagination="false"
          ></a-table>
          <a-pagination
            :showTotal="total => `共 ${pager.total} 条`"
            class="diy-pagination"
            showSizeChanger
            showQuickJumper
            @change="pagerChange"
            @showSizeChange="sizeChange"
            v-model="pager.page"
            :total="pager.total"
          />
        </div>
        <div class="renew-right">
          <div>
            <div class="renew-right-title">已选帐号</div>
            <div class="item-right" v-for="(item,ind) in list" :key="item.account">
              {{item.account}}
              <a-icon class="fr" type="close" @click="deleteItem(item,ind)" />
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import TableFilter from "@/components/TableFilter";
import api from "@/api/api";
export default {
  components: { TableFilter },
  data() {
    return {
      renewModal: false,
      appId: null,
      filterFieldList: [
        {
          type: "input",
          name: "accounts",
          label: "帐号ID"
        },
        {
          type: "dateRange",
          name: ["timeBegin", "timeEnd"],
          label: "帐号到期时间"
        }
      ],
      filterField: {},
      columns: [
        {
          title: "帐号",
          dataIndex: "account"
        },
        {
          title: "手机号",
          dataIndex: "qfyAcct"
        },
        {
          title: "到期时间",
          dataIndex: "softDate"
        },
        {
          title: "剩余时间",
          dataIndex: "remaiDate"
        }
      ],
      dataList: [],
      pager: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      selectedRowKeys: []
    };
  },
  computed: {
    list() {
      let list = [];
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        list.push(JSON.parse(this.selectedRowKeys[i]));
      }
      return list;
    }
  },
  methods: {
    getList() {
      api
        .w0066({
          page: this.pager.page,
          pageSize: this.pager.pageSize,
          appId: this.appId,
          ...this.filterField,
          accounts: this.filterField.accounts ? [this.filterField.accounts] : []
        })
        .then(res => {
          this.dataList = res.data.list;
          let pager = res.data.page;
          this.pager.page = pager.currentPage;
          this.pager.total = pager.dataTotal;
          this.renewModal = true;
        });
    },
    filterFun(values) {
      this.filterField = values;
      // this.pager = {
      //   page: 1,
      //   pageSize: 10
      // };
      this.getList();
    },
    sizeChange(current, pageSize) {
      this.pager.pageSize = pageSize;
      this.pager.page = 1;
      this.getList();
    },
    pagerChange(page, pageSize) {
      this.pager.page = page;
      this.getList();
    },
    renewOpen(appId) {
      this.appId = appId;
      this.getList();
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
    },
    deleteItem(item, ind) {
      let str = JSON.stringify(item);
      let num = this.selectedRowKeys.indexOf(str);
      this.selectedRowKeys.splice(num, 1);
    },
    renewModalOk() {
      window.sessionStorage.setItem("accounts", JSON.stringify(this.list));
      if (this.list.length) {
        this.$router.push("/apps/store/renew?appId=" + this.appId);
      } else {
        this.$message.info("请先选择帐号");
      }
    },
    renewModalCancel() {
      this.renewModal = false;
      this.selectedRowKeys = [];
      this.filterField = {};
    }
  }
};
</script>
<style lang="less" scope>
.renew-modal {
  display: flex;
  .renew-left {
    flex: 0 0 627px;
    border: 1px solid #e8e8e8;
    .renew-table {
      .ant-table-content {
        .ant-table-placeholder {
          border: none;
        }
        .ant-table-body {
          table {
            border: none;
            .ant-table-thead tr th,
            .ant-table-tbody tr td {
              border: none;
              padding: 10px;
              text-align: center;
            }
            .ant-table-thead tr th,
            .ant-table-tbody tr:nth-child(even) {
              background-color: #fff;
            }
            .ant-table-tbody tr:nth-child(odd) {
              background-color: #f7f8fa;
            }
          }
        }
      }
    }
    .diy-pagination {
      text-align: right;
      padding: 20px;
    }
  }
  .renew-right {
    flex: 1;
    margin-left: 20px;
    height: 456px;
    overflow-y: auto;
    border: 1px solid #e8e8e8;
    .renew-right-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 40px;
      padding: 0 20px;
    }
    .item-right {
      line-height: 26px;
      padding: 15px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      .fr {
        font-size: 16px;
        padding: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
