<template>
  <div class="page-register">
    <div>
      <img src="../../assets/images/login-bg.png" />

      <a-form :form="form">
        <a-form-item>
          <a-tooltip placement="right">
            <template slot="title">
              <p
                style="font-size:12px; line-height:16px;"
              >长度为6-32个字符，支持中文、数字、英文，不允许有标点符号及空格，账号一旦设置成功无法修改</p>
            </template>
            <a-input
              
              addonBefore="帐号:"
              :maxLength="32"
              v-decorator="['entpAcct', { rules: [{ required: true, message: '请输入帐号' },{validator:validateRules.checkAccount}] }]"
            />
          </a-tooltip>
        </a-form-item>

        <a-form-item>
          <a-tooltip placement="right">
            <template slot="title">
              <p style="font-size:12px; line-height:16px;">1.长度为6-14个字符，支持数字、大小写字母、标点符号，不允许有空格。</p>
              <p style="font-size:12px; line-height:16px;">2.数字、字母、标点符号至少包含两种。</p>
            </template>
            <a-input
              type="password"
              
              :maxLength="14"
              addonBefore="密码:"
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码' },{validator:validateRules.checkPassword}] }]"
            />
          </a-tooltip>
        </a-form-item>

        <a-form-item>
          <a-input
            type="password"
            
            :maxLength="14"
            addonBefore="确认密码："
            v-decorator="['password2', { rules: [{ required: true, message: '请确认密码' },{validator:r}]}]"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            
            :maxLength="11"
            addonBefore="手机:"
            v-decorator="['entpPhone', { rules: [{ required: true, message: '输入手机号' },{validator:validateRules.checkPhone}] }]"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            
            addonBefore="邮箱:"
            v-decorator="['entpMail', { rules: [{ required: true, message: '输入邮箱号' },{validator:validateRules.checkMail}] }]"
          />
        </a-form-item>

        <a-form-item>
          <a-row>
            <a-col :span="16">
              <a-input
                
                addonBefore="图形验证码:"
                :maxLength="6"
                v-decorator="['verifyCode', { rules: [{ required: true, message: '请输入图形验证码' }] }]"
              />
            </a-col>
            <a-col :span="8">
              <img class="code-img" :src="codeImgUrl" @click="getCodeImgUrl" />
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item style="margin-bottom:0;">
          <a-row>
            <a-col :span="16">
              <a-input
                
                addonBefore="手机验证码:"
                :maxLength="6"
                v-decorator="['validateCode', { rules: [{ required: true, message: '请输入验证码' }] }]"
              />
            </a-col>
            <a-col :span="8">
              <a-button  type="primary" block ghost @click="getValidateCode">获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-checkbox
            v-decorator="['agreement', { valuePropName: 'checked',   rules: [{ required: true, message: '先阅读条款' }]  }]"
          >
            我已同意
            <a href="javascript:void(0);" @click="v1=true">《企蜂云服务条款》</a>和
            <a href="javascript:void(0);" @click="v2=true">《企蜂云隐私声明》</a>
          </a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button  type="primary" block @click="register">注册</a-button>
          <p style="text-align:center;">
            <router-link to="/login">已有帐号，立即登录</router-link>
          </p>
        </a-form-item>
      </a-form>
    </div>

    <a-modal width="80%" :footer="null" @cancel="v1=false" :visible="v1">
      <div>
        <p style="margin:0pt; orphans:0; text-align:center; widows:0">
          <span style="font-family:宋体; font-size:16pt; font-weight:bold">企蜂云服务条款</span>
        </p>
        <p style="margin:0pt; orphans:0; text-align:right; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2020年1月版</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">前言</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >欢迎访问企蜂云</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >并使用我们提供的产品和服务</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >在完成注册程序或以任</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >何方式使用企蜂云服务前，请您务必仔细阅读并透彻理解企蜂云服务条款</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >(</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >以下或简称“服务条款</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >”)</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >，在确认充分理解后选择接受或不接受本服务条款</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >；一旦您完成“同意协议并注册”</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >或开始以其他方式使用企蜂云服务，即表明您已阅读并同意受本服务条款的约束。如您不同意本服务条款或其中任何条款</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >约定，您应不再进行下一步或停止注册程序。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云再次提示您审慎阅读、充分理解各条款内容，特别是限制或免除责任的相应条款，限制或免除责任条款将以加粗或其他醒目形式提示您注意。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >如果您未满18周岁，请在法定监护人的陪同下阅读本服务条款。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 36pt; orphans:0; text-indent:-36pt; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">一、</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">签约主体及协议范围</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">1.1</span>
          <span style="font-family:宋体; font-size:12pt">企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">服务条款是您与</span>
          <span style="font-family:宋体; font-size:12pt">浙江企蜂信息技术有限公司</span>
          <span style="font-family:宋体; font-size:12pt">（“企蜂云”或者“我们”）就使用企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">服务（包含为您提供网站页面信息浏览、账户注册服务等）而订立的有效合约。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >1.2</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >如</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您使用或购买企蜂云</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >上某一具体云服务，您可仍需确认具体服务对应的服务条款；请您审慎阅读、充分理解各条款内容，选择接受或不接受该服务条款。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 36pt; orphans:0; text-indent:-36pt; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">二、</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">账户的注册、使用与安全</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2.1注册的资格</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.1.1您确认，在您完成注册程序或以其他企蜂云允许的方式实际使用本服务时，您</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织（以下或简称为“您”）。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >2.1.2</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >若您是未成年人或限制民事行为能力人，则您不具备前述主体资格，您及您的监护人应承担因您的不当注册行为而导致的一切后果。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >2.1.3</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册及使用企蜂云服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2.2账户注册</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >2.2.1当您按照注册页面提示填写信息、阅读并同意本服务条款且完成全部注册程序后，您可获得企蜂云账户并成为企蜂云的用户。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >您在注册时候设置或确认的账户名（“账户名称”）及您设置的密码，将在注册成功后成为您的账户（账户名称及密码合称“账户”）。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >2.2.3</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您设置的账户名不得违反国家法律法规、企蜂云</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >的管理规范或容易引起</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您与企蜂云身份的混淆，否则您的账户可能不能注册成功或企蜂云</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >有权经通知您后予以注销。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:normal">2.2.4</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:normal"
          >您应当按照法律法规要求或按相应页面的提示，准确提供并及时更新您的账</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:normal">户信息，以使之真实、</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:normal"
          >及时、完整和准确。如您提供的资料错误、不实、过时或不完整的，企蜂</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:normal">云可以向您发出询问及/</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:normal">或要求改正的通知，您应按照企蜂</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:normal">云的要求配合提供或者更新相关资料。</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >因您填写的信</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >息、资料不真实、不及时、不完整或不准确的，您应承担您不能使用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云账户（不能注册成功、或账户被冻结、注销）或您在使用过程中的后果和损失。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.5</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >企蜂云可能会就某些产品或服务的开通，要求您提供更多的身份资料和信息，做进一步的身份认证或资格验证，您的账户只有在通过这些认证和验证之后，方可获得使用相关产品或服务的资格。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.6</span>
          <span style="font-family:宋体; font-size:12pt">通常情况下，您的企蜂云账户是您在企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云网站进行一切活动的唯一身份标识，除非另有约定，每一个企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云账户都可以在本网站独立开展活动。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2.3账户的使用和安全</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.3.1您有权使用您设定的账户登录企蜂云网站，进而使用企蜂云提供的其他服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.3.2</span>
          <span style="font-family:宋体; font-size:12pt">企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云可能会以邮件、站内信、短信或电话等方式通知您服务进展情</span>
          <span style="font-family:宋体; font-size:12pt">况以及提示您进行下一步的操作。在服务过程中您应当及时登录到企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">账户查看和进行交易操作。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >2.3.3</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >一个企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云账</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >户仅能对应唯一的法律主体。除非有法律明文规定、司法裁定或者经企蜂云同意的情况下，您不得以任何方式转让、赠与或让他人继承您的企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云账户。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.3.4</span>
          <span style="font-family:宋体; font-size:12pt">您的账户和密码由您自行设置并由您保管，您须对您的企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云账户和密码保密。您需确保您在每个上网时段结束时，以正确步骤离开网站。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >2.3.5</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >如发现他人未经授权使用您的企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >账户和密码，您应立即通知企蜂云；企蜂云将协助您冻结账户、更改密码或进行其他安全设置；您理解企蜂云对您的请求采取行动需要合理时间，企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云对在采取行动前已经产生的以及由您引发的后果（包括但不限于您的任何损失）不承担任何责任。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.3.6</span>
          <span style="font-family:宋体; font-size:12pt">企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云亦会在网站服务端采取合理的技术措施保障账户的安全。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 36pt; orphans:0; text-indent:-36pt; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">三、</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">账户的冻结</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">注销及申诉</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.1账户的冻结</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">您的企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云账户（全部或部分权限或功能）在如下情况可能被冻结</span>
          <span style="font-family:宋体; font-size:12pt">，企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云将通过邮件、站内信、短信或电话等方式通知您：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.1</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >基于企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云网站</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >或服务运行和交易安全的需要，如您发生或可能发生破坏或试图破坏企蜂云或企蜂云关联公司公平交易环境或正常交易秩序的，或任何使用含有企蜂云或企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云关联公司名称、品牌且对他人有误导嫌疑或任何使用某种中英文(全称或简称)</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >、数字、域名等意图表示或映射与企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云或其关联公司具有某种关联的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.2违反本服务条款、企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云网站的相关规则、规范（如交易规则、管理规范）、服务说明以及其他服务协议/条款的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.3</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >违反国家法律、法规、政策、法律文书的规定的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.4</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您遭到他人投诉， 且对方已经提供了相关证据的，而您未按照我们的要求提供相反证据的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.5企蜂云根据合理分析判断您的账户操作</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >存在异常的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.6</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >国家有权机关要求进行的冻结的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.1.7企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云合理判断，您发生与如上行为性质相同或产生如上类似风险的其他情况的。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.2账户注销</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.2.1</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >如果出现如上第3.1</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >条情形且情形严重的，或基于国家有权机关的要求，您的企蜂云账户（全部或部分权限或功能）将被注销，企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云将通过邮件、站内信、短信或电话等方式通知您。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.3申诉</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">发生前述账户冻结或注销情况下，您应及时予以关注并可以按照程序进行申诉等后续操作：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.3.1您通过申诉程序，向企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云申请解除上述冻结或注销的，为了您的账户安全，您应配合如实提供身份证明及相关资料</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >，以及企蜂云要求的其他信息或文件，以便企蜂云进行核实。您应充分理解您的申诉并不必然被允许，企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云有权决定是否同意您的申诉请求。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >3.3.2</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >理解并同意，如果您拒绝如实提供身份证明及相关资料，或未能通过企蜂云审核，企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云有权长期冻结该等账户且长期限制账户部分或全部功能。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">四</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">网站服务及规范</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >4.1您有权享受企蜂云通过本网站提供的互联网技术服务和信息服务。您同时还应根据本服务条款以及您在购买具体服务时确认的相关条款和条件，履行及时付款、服务管理等责任。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">4.2您使</span>
          <span style="font-family:宋体; font-size:12pt">用企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云的服务，您应保证：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >4.2.1</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您使用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云服务时将遵从国家、地方法律法规、行业惯例和社会公共道</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >德，不会利用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云提供的服务进行存储、发布、传播如下信息和内容：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（1）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >违反国家法律法规政策的任何内容（信息）；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（2）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >违反国家规定的政治宣传和/或新闻信息；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（3）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >涉及国家秘密和/或安全的信息；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（4）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >封建迷信和/或淫秽、色情、下流的信息或教唆犯罪的信息；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（5）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >博彩有奖、赌博游戏；违反国家民族和宗教政策的信息；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（6）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >妨碍互联网运行安全的信息；</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >、</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（7）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >侵害他人合法权益的信息和/或其他有损于社会秩序、社会治安、公共道德的信息或内容；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >（8）</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您同时承诺不得为他人发布上述不符合国家规定和/或本服务条款约定的信息内容提供任何便利，包括但不限于设置URL、BANNER</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >、</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >链接等；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >4.2.2</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >不应出现任何破坏或试图破坏网</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >络安全等的行为，包括不会利用技术或其他手段破坏或扰乱本网</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >站及企蜂云各应用下</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >的网站；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >4.2.3</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您使用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云网站的服务应符合本服务条款；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >如您违反上述保证，企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云除有权根据相关服务条款采取删除信息、中止服</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >务、终止服务的措施，并有权冻结或注销您账户部分或全部功能。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">五</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">隐私及个人信息保护</span>
        </p>
        <p style="margin:0pt 0pt 0pt 36pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您的信任对企蜂云非常重要，企蜂云深知用户信息安全的重要性，企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云将按照法律法规要求，采取安全保护措施，保护您的用户信息安全可控。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">六、知识产权</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >6.1我们尊重知识产权，除非获得了您的同意，企蜂云不会擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表您拥有知识产权的成果。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">6.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >任何组织或个人认为企蜂云网站的网页内容，如转载文章、云市场服务商发布的商品信息等可能侵犯其合法权益的，可向企蜂云提出书面权利通知，企蜂云将在收到知识产权权利人合格通知后依法尽快处理。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">6.3除非</span>
          <span style="font-family:宋体; font-size:12pt">另行说明，企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">网站Logo</span>
          <span style="font-family:宋体; font-size:12pt">、“企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">”、“</span>
          <span style="font-family:宋体; font-size:12pt">qi</span>
          <span style="font-family:宋体; font-size:12pt">fengyun</span>
          <span style="font-family:宋体; font-size:12pt">”等文字、图形及其组合，以及企蜂云网站的其他标识、徽记、企蜂云服务的名称等的知识产权为企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云及其关联公司所有。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >6.4</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您应尊重企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云和第三方的知识产权和其他合法权利/权益，并保证在发生侵犯前述权益</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >的违法事件时，保护企蜂云及其雇员、股东、合作伙伴等免于因该等事件受到影响或损失，企蜂云保留在您侵犯企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云及/或其他第三方的合法权利/权益时终止向您提供服务并不退还任何款项的权利。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">七</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">保密</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">企蜂云承诺对您注册账户时或使用企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">服务时提交或知悉的信息采取保密措施，不向第三方披露您的信息，除非：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">7.1</span>
          <span style="font-family:宋体; font-size:12pt">依据本服务条款或者您与企蜂云之间其他服务协议、合同、在线条款等规定可以提供的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">7.2依据法律法规的规定或行政、司法等职权部门要求应当提供的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">7.3在</span>
          <span style="font-family:宋体; font-size:12pt">不违反本服务条款约定责任的前提下，该保密信息已经公开或能从公开领域获得。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">八</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">信息安全</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">企蜂云将基于浙江企蜂信息技术有限公司</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >安全应急响应中心及时响应信息安全事件，并依据国家法律法规的要求、遵照相关安全事件处理标准管理信息安全事件。当发生涉及您相关资产的信息安全事件时，我们会依法及时将事件相关的情况通过邮件、信函、电话、推送通知等方式告知，您也可通过工单、客服电话、大客户经理电话等方式主动联系我们。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">九</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、责任范围和责任限制</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >10.1您了解并同意，您应承担因您使用本服务、违反本服务条款或在</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >您的账户下采取的任何行动而导致的任何第三方索赔。如果由此引起企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云及其关联公</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >司、员工、客户和合作伙伴被第三方索赔的，您应负责处理，并赔偿企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云及其关联公司由此遭受的全部损失和责任。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >10.2</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >在适用法律许可的范围内，企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云不对与本服务条款有关或由本服务条款引起的任何间接的、惩罚性的、特殊的、派生的损失承担赔偿责任。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >10.3</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >企蜂云在此提示，您在使用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云服务</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >期间应当遵守中华人民共和国的法律，不得危害网络安全，不得利用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >的服务从事侵犯他人名誉、隐私、知识产权和其他合法权益的活动。企蜂云不对您使用企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云服务的违法或违约行为承担任何责任。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">10.4</span>
          <span style="font-family:宋体; font-size:12pt">企蜂云用户在企蜂云网站及应用</span>
          <span style="font-family:宋体; font-size:12pt">上自行上传、提供、发布相关信息，包括但不限于用户名称、公司名称、</span>
          <span style="font-family:宋体; font-size:12pt">联系人及联络信息，相关图片、资讯等，均由用户自行提供，企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云的用户须对其提供的前述信息依法承担全部责任。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">十</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">不可抗力和意外事件</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云的网站可能因为下</span>
          <span style="font-family:宋体; font-size:12pt">列不可抗力或意外事件无法正常运行的，企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云不承</span>
          <span style="font-family:宋体; font-size:12pt">担损害赔偿责任：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">10.1</span>
          <span style="font-family:宋体; font-size:12pt">因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">10.2因电力供应故障、通讯网络故障等公共服务因素；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">10.3经</span>
          <span style="font-family:宋体; font-size:12pt">提前公告或通知的，企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云在短时间内的系统维护。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">十一</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">法律适用与管辖</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >本服务条款之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本服务条款产生之争议应提交至浙江省杭州市西湖区人民法院解决。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">十二</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">通知送达</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">12.1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >您理解并同意，企蜂云可通过网页公告、电子邮件、站内信、短信、电话、系统消息以及即时通信等以上一种或多种通知方式向您发送通知，且企蜂云云可以信赖您所提供的联系信息是完整、准确且当前有效的；上述通知在发送成功后视为已送达。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">12.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >除非本服务条款另有约定或企蜂云与您另行签订的协议明确规定了通知方式，您发送给企蜂云的通知，应当通过企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">十三</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">条款的更新和终止</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >13.1</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold; text-decoration:underline"
          >云有权对本服务条款及相应的服务规则内容进行变更，并将网页公告、电子邮件、站内信、短信等方式予以公告或通知；若您在本服务条款内容变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的内容，也将遵循修改后的条款内容。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">13.2</span>
          <span style="font-family:宋体; font-size:12pt">在您的账户注销或经双方协商一致终止</span>
          <span style="font-family:宋体; font-size:12pt">服务的，本服务条款终止。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">十四</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">其他</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">14.1本服务条款由本服务条</span>
          <span style="font-family:宋体; font-size:12pt">款的内容、网站相关页面上展现的规则、规范，服务说明</span>
          <span style="font-family:宋体; font-size:12pt">和您点击确认的其他条款/</span>
          <span style="font-family:宋体; font-size:12pt">条件组成，企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">和您均受其约束，且其中的相关名词可相互引用、解释。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">14.2本服务条款的章节标题仅为行文方便而设，不具有法律或合同效力。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >14.3本服务条款任一条款被视为废止、无效或不可执行，该条款应视为可分的且不影响本服务条款及其他条款的有效性及可执行性。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">14.4</span>
          <span style="font-family:宋体; font-size:12pt">本</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >服务条款项下之保密条款、知识产权条款、法律适用与管辖条款以及性质上理应存续的其他条款（如对注册信息的真实性保证等），不因本条款的终止而失效。</span>
        </p>
      </div>
    </a-modal>

    <a-modal width="80%" :footer="null" @cancel="v2=false" :visible="v2">
      <div>
        <p style="margin:0pt; orphans:0; text-align:center; widows:0">
          <span style="font-family:宋体; font-size:15pt; font-weight:bold">企蜂云隐私声明</span>
        </p>
        <p style="margin:0pt; orphans:0; text-align:center; widows:0">
          <span style="font-family:Calibri; font-size:15pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; text-align:right; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">最近更新日期：</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2020</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">年1月</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">20</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">日</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">提示条款</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">您的信任对我们非常重要，我们深知用户信息安全的重要性，我们将按照法律法</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >规要求，采取安全保护措施，保护您的用户信息安全可控。鉴此，企蜂云（或简称“我们”）制定本《企蜂云隐私声明</span>
          <span style="font-family:宋体; font-size:12pt">》（以下或简称“隐私声明”）并提醒您：在使用企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">网站</span>
          <span style="font-family:宋体; font-size:12pt">的各项服务前，请您务必仔细阅读并透彻理解本《企蜂云隐私声明</span>
          <span style="font-family:宋体; font-size:12pt">》</span>
          <span style="font-family:宋体; font-size:12pt">，在确认充分理解并同意后方使用相关产品和服务。一旦您开始使用企蜂云服务，将被视为对本声明</span>
          <span style="font-family:宋体; font-size:12pt">内容的接受和认可。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">隐私声明</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云（以下或称为“我们”）尊重并保护用户信息，并且将以高度勤勉和审慎的义务对待这</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >些信息。在您使用了企蜂云网站提供的服务时，我们将按照本隐私声明收集、处理及披露您的信息。我们希望通过本隐私声明</span>
          <span style="font-family:宋体; font-size:12pt">向您清晰地介绍我们对您信息的处理方式，因此我们</span>
          <span style="font-family:宋体; font-size:12pt">建议您完整地阅读本隐私声明</span>
          <span style="font-family:宋体; font-size:12pt">，以帮助您了解维护自己隐私权的方式。如果您有任何疑问、意见或</span>
          <span style="font-family:宋体; font-size:12pt">建议，请通过客服</span>
          <span style="font-family:宋体; font-size:12pt">与我们联系。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 36pt; orphans:0; text-indent:-36pt; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">一、</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">本协议适用范围</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">本隐私声明适用于企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云网</span>
          <span style="font-family:宋体; font-size:12pt">站所有服务。服务包括向您提供页面浏览、网站登录服务，以及通过企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云网站向您提供的技术服务。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 36pt; orphans:0; text-indent:-36pt; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">二、</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">我们如何使用和收集您的信息</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2.1</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">提供帐号服务</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.1.1</span>
          <span style="font-family:宋体; font-size:12pt">当您在企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云网站创建账户时，您须向我们提供会员名</span>
          <span style="font-family:宋体; font-size:12pt">（邮箱）</span>
          <span style="font-family:宋体; font-size:12pt">、设置、确认您的登录密码、</span>
          <span style="font-family:宋体; font-size:12pt">提供您的</span>
          <span style="font-family:宋体; font-size:12pt">手机号码。您提交的手机号码用于您</span>
          <span style="font-family:宋体; font-size:12pt">密码找回时</span>
          <span style="font-family:宋体; font-size:12pt">接受验证码，并且作为您与企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云指定</span>
          <span style="font-family:宋体; font-size:12pt">的联系方式之一，用来接受相关业务通知（如产品</span>
          <span style="font-family:宋体; font-size:12pt">上线、服务变更等）；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.1.2当您完成企蜂云企业账户注册后</span>
          <span style="font-family:宋体; font-size:12pt">，</span>
          <span style="font-family:宋体; font-size:12pt">您可在</span>
          <span style="font-family:宋体; font-size:12pt">【主页】进行企业认证，</span>
          <span style="font-family:宋体; font-size:12pt">填写信息</span>
          <span style="font-family:宋体; font-size:12pt">包括（1）企业主体的信息：营业执照、企业注册地址</span>
          <span style="font-family:宋体; font-size:12pt">，（2）</span>
          <span style="font-family:宋体; font-size:12pt">法人或代</span>
          <span style="font-family:宋体; font-size:12pt">办人信息</span>
          <span style="font-family:宋体; font-size:12pt">（法人姓名、</span>
          <span style="font-family:宋体; font-size:12pt">法人证件号码、</span>
          <span style="font-family:宋体; font-size:12pt">法人证件照、代办人姓名、</span>
          <span style="font-family:宋体; font-size:12pt">代办人证件号码、</span>
          <span style="font-family:宋体; font-size:12pt">代办人证件照）</span>
          <span style="font-family:宋体; font-size:12pt">等</span>
          <span style="font-family:宋体; font-size:12pt">，若未进行企业认证将影响您企蜂云的使用</span>
          <span style="font-family:宋体; font-size:12pt">，</span>
          <span style="font-family:宋体; font-size:12pt">只能使用企蜂云网站</span>
          <span style="font-family:宋体; font-size:12pt">浏览</span>
          <span style="font-family:宋体; font-size:12pt">的基础功能。</span>
          <span style="font-family:宋体; font-size:12pt">完成企业认证后您可使用企蜂云的所有</span>
          <span style="font-family:宋体; font-size:12pt">功能如：应用购买、钱包充值、员工管理等</span>
          <span style="font-family:宋体; font-size:12pt">；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.1.3</span>
          <span style="font-family:宋体; font-size:12pt">为了更好的向您提供企业服务，需要收集您企业员工的姓名、手机号、邮箱、密码等</span>
          <span style="font-family:宋体; font-size:12pt">。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2.2</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">为</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">您提供商品或服务</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.1</span>
          <span style="font-family:宋体; font-size:12pt">为便于向您提供我</span>
          <span style="font-family:宋体; font-size:12pt">们的产品或服务，我们会记录您提供的收货人姓名、收货地址</span>
          <span style="font-family:宋体; font-size:12pt">、收货人联系电话</span>
          <span style="font-family:宋体; font-size:12pt">、发票信息</span>
          <span style="font-family:宋体; font-size:12pt">、合同甲方信息。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.2</span>
          <span style="font-family:宋体; font-size:12pt">当您与我们联系时，我们可能会保存您的通信/通话记录和内容或您留下的联系方式等信息</span>
          <span style="font-family:宋体; font-size:12pt">，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.3</span>
          <span style="font-family:宋体; font-size:12pt">为展示您账户的订单信息，我们会收集您在使用</span>
          <span style="font-family:宋体; font-size:12pt">我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >为确认交易状态及为您提供售后与争议解决服务，我们会通过您基于交易所选择的交易对象、支付机构、物流公司等收集与交易进度相关的</span>
          <span style="font-family:宋体; font-size:12pt">交易、支付、物流信息，或将您的交易信息共享给上述服务提供者</span>
          <span style="font-family:宋体; font-size:12pt">；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">2.2.5</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >为向您提供更契合您需求的页面展示，我们会收集关于您使用的服务以及使用方式的信息并将这些信息进行关联，这些信息包括：</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">（1）</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（例如设备型号、操作系统版本等软硬件特征和设备环境信息）、设备所在位置相关信息（例如IP 地址、GPS位置以及能够提供相关信息的Wi-Fi 接入点、蓝牙和基站等传感器信息）。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">（2）</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">（3）</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >为展示您账户的订单信息，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">2.3为您提供安全保障</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >为提高您使用我们及合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病</span>
          <span style="font-family:宋体; font-size:12pt">毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或企蜂云</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >服务相关协议规则的情况，我们可能会收集、使用或整合您的账户信息、交易信息、设备信息、日志信息以及我们关联公司、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 36pt; orphans:0; text-indent:-36pt; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">三、</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">我们如何共享、转让、公开披露您的用户信息</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.1共享</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">我们不会与其他组织和个人共享您的用户信息，但以下情况除外：</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.1.1</span>
          <span style="font-family:宋体; font-size:12pt">在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的用户信息；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.1.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >在法定情形下的共享：我们可能会根据法律法规规定、诉讼、仲裁解决需要，或按行政、司法机关依法提出的要求，对外共享您的用户信息；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.1.3</span>
          <span style="font-family:宋体; font-size:12pt">为了促成交易或协助解决争议，某些情况下只有共享您的用户信息，</span>
          <span style="font-family:宋体; font-size:12pt">才能促成交易或处理您与他人的纠纷或争议，例如，在企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">市场上创建的</span>
          <span style="font-family:宋体; font-size:12pt">某一交易中，</span>
          <span style="font-family:宋体; font-size:12pt">如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.1.4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >与授权合作伙伴共享：我们可能委托受信赖的合作伙伴来提供服务，因此我们可能会与合作伙伴共享您的某些用户信息，以提供更好的客户服务和优化用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的用户信息，并且只会共享提供服务所必要的用户信息。我们的合作伙伴无权将共享的用户信息用于任何其他用途。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >对我们与之共享用户信息的公司、组织和个人，我们会与其签署严格的保密协议以及信息保护约定，要求他们按照我们的说明、本隐私权政策以及其他任何相关的保密和安全措施来处理用户信息。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.2转让</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">我们不会将您的用户信息转让给任何公司、组织和个人，但以下情况除外：</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.2.1</span>
          <span style="font-family:宋体; font-size:12pt">在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的用户信息；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.2.2在企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >云与其他法律主体者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到用户信息转让，我们会要求新的持有您用户信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.3公开披露</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">我们仅会在以下情况下，公开披露您的用户信息：</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.3.1</span>
          <span style="font-family:宋体; font-size:12pt">获得您明确同意或基于您的主动选择，我们可能会公开披露您的用户信息；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.3.2</span>
          <span style="font-family:宋体; font-size:12pt">如果我们确定您出现违反法律法规或严重违反企蜂云相关协议规则的情况，或为保护企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">及其关联公司用户或公众的人身财产安全免</span>
          <span style="font-family:宋体; font-size:12pt">遭侵害，我们可能依据法律法规或企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">相关协议规则</span>
          <span style="font-family:宋体; font-size:12pt">征得您同意的情况下披露关于您的个人信息，包括相关违规行为以及企蜂云</span>
          <span style="font-family:宋体; font-size:12pt">已对您采取的措施。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold"
          >3.4共享、转让、公开披露用户信息时事先征得授权同意的例外</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">以下情形中，共享、转让、公开披露您的用户信息无需事先征得您的授权同意：</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.4.1</span>
          <span style="font-family:宋体; font-size:12pt">与国家安全、国防安全有关的；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.4.2</span>
          <span style="font-family:宋体; font-size:12pt">与公共安全、公共卫生、重大公共利益有关的；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.4.3</span>
          <span style="font-family:宋体; font-size:12pt">与犯罪侦查、起诉、审判和判决执行等有关的；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.4.4</span>
          <span style="font-family:宋体; font-size:12pt">出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.4.5</span>
          <span style="font-family:宋体; font-size:12pt">您自行向社会公众公开的个人信息；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.4.6</span>
          <span style="font-family:宋体; font-size:12pt">从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.5</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">我们如何保护和保存您的用户信息</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.5.1</span>
          <span style="font-family:宋体; font-size:12pt">企蜂</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >云非常重视您的信息安全。我们努力采取各种合理的物理、电子和管理方面的安全措施来保护您的用户信息。防止用户信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会使用加密技术提高用户信息的安全性；我们会使用受信赖的保护机制防止用户信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问用户信息；</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.5.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >我们会采取合理可行的措施，尽力避免收集无关的用户信息。我们只会在达成本政策所述目的所需的期限内保留您的用户信息，除非受到法律的允许。超出上述用户信息保存期限后，我们会对您的个人信息进行删除或匿名化处理。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.5.3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >互联网并非绝对安全的环境，我们强烈建议您通过安全方式、使用复杂密码，协助我们保证您的帐号安全。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.5.4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >在不幸发生用户信息安全事件（泄露、丢失等）后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知用户信息主体时，我们会采取合理、有效的方式发布公告。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">3.5.5</span>
          <span style="font-family:宋体; font-size:12pt">同时，我们还将按照监管部门要求，上报用户信息安全事件的处置情况。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">3.5.6</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold"
          >请您务必妥善保管好您的帐号、密码及其他身份要素。您在使用企蜂云服务时，我们会通过您的帐号、密码</span>
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold"
          >来识别您的身份。一旦您泄露了前述信息，您可能会蒙受损失，并可能对您产生不利。如您发现帐号、密码及/或其他身份要素可能或已经泄露时，请您立即和我们取得联系，以便我们及时采取相应措施以避免或降低相关损失。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">四、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">我们如何使用Cookie 和同类技术</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">4.1为确保网</span>
          <span style="font-family:宋体; font-size:12pt">站正常运转、为您获得更轻松的访问体验</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >，我们会在您的计算机或移动设备上存储名Cookie、Flash Cookie或浏览器或关联应用程序提供的其他通常包含标识符、站点名称以及一些号码和字符的本地存储（统称“Cookie”）。借助于 Cookie</span>
          <span style="font-family:宋体; font-size:12pt">，网站能够存储您</span>
          <span style="font-family:宋体; font-size:12pt">购物车内的商品等数据。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">4.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >如果您的浏览器或浏览器附加服务允许，您可修改对Cookie的接受程度或拒绝我们的Cookie。但如果您这么做，在某些情况下可能会影响您安全访问我们的网站，而无法使用部分我们提供的服务。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">五</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">您如何管理您的信息</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">5.1</span>
          <span style="font-family:宋体; font-size:12pt">您可以登录企蜂云网站</span>
          <span style="font-family:宋体; font-size:12pt">查询、管理（变更）使用企蜂</span>
          <span style="font-family:宋体; font-size:12pt">云服务时而提交的基本业务信息（基本资料）和联系人信息。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">5.2</span>
          <span style="font-family:宋体; font-size:12pt">在变更</span>
          <span style="font-family:宋体; font-size:12pt">前述信息时，我们可能会要求您进行身份验证，以保障信息安全</span>
          <span style="font-family:宋体; font-size:12pt">。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">六</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、未成年人用户信息的特别约定</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">8.1</span>
          <span style="font-family:宋体; font-size:12pt">我们主要面向成人</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >提供产品和服务。如您为未成年人，我们要求您请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">8.2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">七</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">隐私声明更新</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span
            style="font-family:宋体; font-size:12pt"
          >我们提供的服务和产品会不时更新和调整，隐私政策也将随之可能变更，如发生变更我们会以公示的方式进行通知到您，也不排除使用“弹框”或者邮件、短信等方式通知到您，请您及时查看最新的隐私政策。</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">八</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">、</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">如何联系我们</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">&#xa0;</span>
        </p>
        <p style="margin:0pt 10.5pt 0pt 0pt; orphans:0; widows:0">
          <span style="font-family:宋体; font-size:12pt">您对本声明和政策内容有任何疑问和意见，或者您对企蜂云本隐私声明</span>
          <span style="font-family:宋体; font-size:12pt">的实践以及操作上有任何疑问和意见，</span>
          <span style="font-family:宋体; font-size:12pt">您可通过客服</span>
          <span style="font-family:宋体; font-size:12pt">与我们联系。</span>
        </p>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      v1: false,
      v2: false,
      form: this.$form.createForm(this, { name: "save" }),
      codeImgUrl: "",
      r: (rule, value, callback) => {
        let password = this.form.getFieldValue("password");
        if (value && password != value) {
          callback("两次密码输入不一致，请重新输入");
        }
        callback();
      }
    };
  },
  created() {
    this.getCodeImgUrl();
  },
  methods: {
    getCodeImgUrl() {
      this.api.G0001().then(res => {
        this.codeImgUrl =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
      });
    },
    getValidateCode() {
      this.form.validateFields(["verifyCode", "entpPhone"], (err, values) => {
        if (!err) {
          this.api
            .Q0003({
              entpPhone: values.entpPhone,
              verifyCode: values.verifyCode
            })
            .then(res => {
              this.$message.success(res.desc);
            });
        }
      });
    },
    register() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.api
            .Q0002({
              entpAcct: values.entpAcct,
              password: values.password,
              entpPhone: values.entpPhone,
              entpMail: values.entpMail,
              validateCode: values.validateCode
            })
            .then(res => {
              this.$router.push("/home");
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-register {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 40px;
  background: url("../../assets/images/login-bg02.png") no-repeat top center;
  background-size: cover;
  & > div {
    width: 488px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px 0px rgba(13, 13, 12, 0.1);
    border-radius: 10px;
    margin: 0 auto;
    padding: 30px 40px 0 40px;
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