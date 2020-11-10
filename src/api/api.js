import { $axios_qfy, $axios_intelligence } from "./index";

let api = {
    // Get 接口
    G0001(params) {
      return $axios_qfy.get("/fwCaptcha", { responseType: "arraybuffer" });
    },
  },
  apiUrl = {
    // Post 接口
    // 个人信息
    getUserInfo: "/user/getUserInfo", // 获取个人信息
    //我的工资
    getGztPassword: "/salaryPassword/getGztPassword", //查询是否已设置密码
    gztSendCode: "/salaryPassword/gztSendCode", // s获取验证码
    saveJson: "/salaryPassword/saveJson", //通过验证码修改密码
    gztCheckPassword: "/salaryPassword/gztCheckPassword", // 输入工资条密码
    updatePassword: "/salaryPassword/updatePassword", // 修改密码
    listJson: "/salaryDetail/listJson", // 我的工资条
    confirmSalary: "/salaryDetail/confirmSalary", // 确认工资条
    expErrorExcel: "/salaryImport/expErrorExcel", // 下载错误数据
    commit: "/salaryImport/commit", // 保存

    // 工资条管理
    findSalaryPager: "/salary/findSalaryPager", // 查询工资条
    deleteSalary: "/salary/deleteSalary", // 删除工资条
    // 工资条详情
    findSalaryRecordPage: "/salaryDetail/findSalaryRecordPage", //工资条详情列表
    batchAndSingleSend: "/salaryDetail/batchAndSingleSend", // 发送工资条
    salaryDetail: "/salaryDetail/salaryDetail", // 工资条明细详情

    
  };

for (let [key, value] of Object.entries(apiUrl)) {
  api[key] = (params) => {
    return $axios_qfy.post(value, params);
  };
}

export default api;
