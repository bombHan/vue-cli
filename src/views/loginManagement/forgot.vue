<template>
  <a-row class="page-forgot">
    <a-col :span="16" :offset="4">
      <div class="page-title">找回密码</div>
      <a-row>
        <a-col span="{20}" offset="{2}">
          <a-steps class="a-step-box" :current="stepNum" labelPlacement="vertical">
            <a-step title="确认帐号" />
            <a-step title="验证信息" />
            <a-step title="设置新密码" />
          </a-steps>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="18" :offset="3">
          <a-form
            v-if="stepNum===0"
            labelAlign="left"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 19 }"
            :form="form"
            @submit="handleSubmit"
          >
            <a-form-item label="企蜂云帐号">
              <a-row>
                <a-col :span="22">
                  <a-input
                    :maxLength="32"
                    v-decorator="['acct', { rules: [{ required: true, message: '请输入帐号' }] }]"
                  />
                </a-col>
                <a-col :span="2">
                  <a-tooltip
                    title="企业帐号密码找回：请输入注册时设置的企业帐号。个人帐号密码找回：请输入个人手机号码。如果忘记帐号，或其他原因，请拨打4008-827-827联系客服。"
                  >
                    <a-icon
                      type="question-circle"
                      style="font-size: 18px;line-height:40px;margin-left: 5px;"
                    />
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="验证码">
              <a-row>
                <a-col :span="18">
                  <a-input
                    :maxLength="6"
                    v-decorator="['verifyCode', { rules: [{ required: true, message: '请输入验证码' }] }]"
                  />
                </a-col>
                <a-col :span="4">
                  <img @click="getCodeImgUrl" class="code-img" :src="codeUrl" alt="pic" />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :colon="false" label=" " style="text-align:right">
              <a-button
                style="width:120px;margin-top:30px"
                type="primary"
                htmlType="submit"
              >确定</a-button>
            </a-form-item>
          </a-form>

          <a-form
            v-if="stepNum===1"
            labelAlign="left"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 19 }"
            :form="form2"
            @submit="handleSubmit2"
          >
            <a-form-item>
              <span
                style="color:#333;font-size:16px;"
              >请使用{{phone.replace(phone.substring(3, 7), "****")}}接收验证码</span>
            </a-form-item>
            <a-form-item label="手机验证码">
              <a-row>
                <a-col :span="19">
                  <a-input
                    :maxLength="6"
                    v-decorator="['noteNumber', { rules: [{ required: true, message: '请输入手机验证码' }] }]"
                  />
                </a-col>
                <a-col :span="5">
                  <a-button v-if="isCodeing"  type="primary" block ghost>{{num}}s</a-button>
                  <a-button v-else  type="primary" block ghost @click="getCode">获取验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :colon="false" label=" " style="text-align:right">
              <a-button
                
                style="width:120px;margin-top:30px"
                type="primary"
                htmlType="submit"
              >确定</a-button>
            </a-form-item>
          </a-form>

          <a-form
            v-if="stepNum===2&&!isSuccess"
            labelAlign="left"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 19 }"
            :form="form3"
            @submit="handleSubmit3"
          >
            <a-form-item label="新密码" extra="长度为6-14个字符，密码必须有数字、字母，区分大小写。">
              <a-input
                
                :maxLength="14"
                v-decorator="['password', { rules: [{ required: true, message: '请输入新密码' }] }]"
              />
            </a-form-item>
            <a-form-item label="确认新密码">
              <a-input
                
                :maxLength="14"
                v-decorator="['password2', { rules: [{ required: true, message: '请输入新密码' },{validator:validate}]}]"
              />
            </a-form-item>
            <a-form-item :colon="false" label=" " style="text-align:right">
              <a-button
                
                style="width:120px;margin-top:30px"
                type="primary"
                htmlType="submit"
              >确定</a-button>
            </a-form-item>
          </a-form>
          <a-row v-if="stepNum===2&&isSuccess">
            <a-col :span="6" style="text-align:right;padding-right:20px">
              <a-icon theme="filled" type="check-circle" style="font-size:48px;color:#7ddc82" />
            </a-col>
            <a-col :span="18">
              <div style="font-size: 18px;color:#333;">您的帐号密码已经修改，请重新登录</div>
              <div style="font-size: 14px;color:#808080;">
                {{num2}}秒后将返回登录页面，点击此立即返回
                <router-link replace to="/login">返回</router-link>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
export default {
  data() {
    return {
      stepNum: 0,
      form: this.$form.createForm(this, { name: "save" }),
      codeUrl: "",
      acct: "",
      phone: "",
      form2: this.$form.createForm(this, { name: "save2" }),
      timer: null,
      isCodeing: false,
      num: 60,
      noteNumber: "",
      form3: this.$form.createForm(this, { name: "save3" }),
      isSuccess: false,
      timer2: null,
      num2: 5,
      validate: (rule, value) => {
        let password = this.form3.getFieldValue("password");
        if (password && password !== value) {
          return Promise.reject("两次密码输入不一致，请重新输入。");
        } else {
          return Promise.resolve();
        }
      }
    };
  },
  created() {
    this.getCodeImgUrl();
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
      this.form.validateFields((err, values) => {
        if (!err) {
          this.api
            .forgot01({
              acct: values.acct,
              verifyCode: values.verifyCode
            })
            .then(res => {
              this.stepNum = 1;
              this.acct = values.acct;
              this.phone = res.data;
            });
        }
      });
    },
    getCode() {
      this.api.forgot02().then(res => {
        this.timer && clearInterval(this.timer);
        this.isCodeing = true;
        this.timer = setInterval(() => {
          if (this.num <= 0) {
            this.timer && clearInterval(this.timer);
            this.isCodeing = false;
            this.num = 60;
          } else {
            --this.num;
          }
        }, 1000);
      });
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          this.api
            .forgot03({
              noteNumber: values.noteNumber
            })
            .then(res => {
              this.stepNum = 2;
              this.noteNumber = values.noteNumber;
            });
        }
      });
    },
    handleSubmit3(e) {
      e.preventDefault();
      this.form3.validateFields((err, values) => {
        if (!err) {
          this.api
            .forgot04({
              acct: this.acct,
              noteNumber: this.noteNumber,
              password: values.password
            })
            .then(res => {
              this.isSuccess = true;
              this.timer2 && clearInterval(this.timer2);
              this.timer2 = setInterval(() => {
                if (this.num2 <= 0) {
                  this.timer2 && clearInterval(this.timer2);
                  this.num2 = 5;
                  this.$router.replace("/login");
                } else {
                  --this.num2;
                }
              }, 1000);
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-forgot {
  padding-top: 100px;
  .page-title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(77, 77, 77, 1);
    line-height: 38px;
  }
  .code-img {
    vertical-align: top;
    width: 118px;
    height: 40px;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>