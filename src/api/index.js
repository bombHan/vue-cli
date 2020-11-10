import axios from "axios";
import {
  message
} from "ant-design-vue";
import _this from "../main.js";

export const $axios_qfy = axios.create({});
// 拦截器 全局处理ajax request
$axios_qfy.interceptors.request.use(
  function (config) {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    const params = config.params || {};
    let slimParams = {};
    for (const key in params) {
      if (params[key] !== "") {
        slimParams[key] = params[key];
      }
    }
    if (config.method === "get") {
      config.params = {
        _t: new Date().getTime(),
        ...slimParams,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//全局处理ajax Error
$axios_qfy.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.status == 200) {
    if (response.data.code == "00000") {
      return Promise.resolve(response.data);
    } else if (response.data.code == "00040") {
      message.error(response.data.desc);
      return Promise.reject(response);
    } else if (response.data.code) {
      message.error(response.data.desc);
      return Promise.reject(response);
    } else {
      return Promise.resolve(response.data);
    }
  } else if (response.status == 403) {
    message.error("登录状态已超时，请重新登录");
    return Promise.reject(response);
  } else {
    message.error(response.data.desc);
    return Promise.reject(response);
  }
}, function (error) {
  console.log(error, error.response, external)
  message.error(error.response.data.msg);
  if (external.call) {
    external.call("CppRefreshPage", {
      url: "0"
    }, (error, result) => {
      console.log(result)
    })
  }
  return Promise.reject(error);
});