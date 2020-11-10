<template>
  <div class="page-login">
    <div>
      <img class="company-icon" src="@/assets/imgs/logo.png" alt="pic" />
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            
            addonBefore="帐号"
            :maxLength="32"
            v-decorator="['account', { rules: [{ required: true, message: '请输入帐号' }] }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input-password
            
            :visibilityToggle="false"
            addonBefore="密码"
            :maxLength="14"
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
          />
        </a-form-item>
        <a-form-item v-if="isNeedCode">
          <a-row>
            <a-col :span="16">
              <a-input
                
                addonBefore="图形验证码:"
                :maxLength="6"
                v-decorator="['verifyCode', { rules: [{ required: true, message: '请输入验证码' }] }]"
              />
            </a-col>
            <a-col :span="8">
              <img class="code-img" :src="codeUrl" @click="getCodeImgUrl" alt="pic" />
            </a-col>
          </a-row>
        </a-form-item>
        <div class="login-forgot">
          <div style="text-align: right">
            <router-link to="/forgot">忘记密码?</router-link>
          </div>
        </div>
        <a-form-item>
          <a-button  type="primary" htmlType="submit" block>登录</a-button>
          <p style="text-align:center;">
            <router-link to="/register">没有帐号，立即注册</router-link>
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "save" }),
      isNeedCode: false,
      codeUrl: ""
    };
  },
  created() {
    // this.getCodeImgUrl();
  },
  methods: {
    getCodeImgUrl() {
      this.api.G0001().then(res => {
        this.codeUrl =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$router.push("/sendsalary");
      // e.preventDefault();
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     let reqData = {
      //       account: values.account,
      //       password: values.password
      //     };
      //     this.isNeedCode && (reqData.verifyCode = values.verifyCode);
      //     this.api
      //       .login01(reqData)
      //       .then(res => {
      //         this.$router.push("/home");
      //       })
      //       .catch(res => {
      //         if (
      //           res.data.code == "00060" &&
      //           res.data.data &&
      //           res.data.data.isNeedVerifyCode
      //         ) {
      //           this.isNeedCode = true;
      //           this.getCodeImgUrl();
      //         }
      //       });
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.page-login {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 100px;
  background: url("../../assets/images/login-bg02.png") no-repeat top center;
  background-size: cover;
  & > div {
    width: 488px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px 0px rgba(13, 13, 12, 0.1);
    border-radius: 10px;
    margin: 0 auto;
    padding: 30px 40px;
    box-sizing: border-box;

    & > img {
      margin-bottom: 26px;
    }

    .ant-row.ant-form-item {
      margin-bottom: 20px;

      .ant-input-group-addon {
        background-color: transparent;
      }

      .ant-input {
        border-left: none;
        padding-left: 0;
      }

      .ant-input:hover {
        border-color: #d9d9d9;
        border-right-width: 1px !important;
      }

      .ant-input:focus {
        border-color: #d9d9d9;
        box-shadow: none;
      }
    }

    .ant-form-item-has-error.ant-row.ant-form-item {
      .ant-input-group-addon {
        color: rgba(0, 0, 0, 0.65);
        background-color: #fff;
        border-color: #d9d9d9;
      }

      .ant-input,
      .ant-input:focus,
      .ant-input:hover {
        border-color: #d9d9d9;
      }
    }
    .code-img {
      vertical-align: top;
      width: 118px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
    }
    .login-forgot {
      line-height: 30px;
      display: flex;

      div {
        flex: 1;
      }
    }
  }
}
</style>