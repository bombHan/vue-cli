import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/index.less";
import router from "./router/index";
import store from "./store/index";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import validateRules from "@/utils/validateRules";
import api from "@/api/api";
import utils from "@/utils/utils";
import QfyAvatar from '@/components/QfyAvatar'

Vue.use(Antd);

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.prototype.validateRules = validateRules;
Vue.prototype.api = api;
Vue.prototype.$utils = utils;
console.log(utils)
Vue.component("qfy-avatar",QfyAvatar);

let _this = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default _this;
