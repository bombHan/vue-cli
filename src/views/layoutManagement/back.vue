<template>
  <div ref="whole" class="back">
    <div class="layout-header">
      <div class="layout-header-logo" @click="clickLogo">
        <img src="../../assets/images/logo1.png" />
        <span style="font-weight: bold">后台</span>
      </div>
      <div class="layout-header-right">
        <a-avatar
          style="vertical-align: top; backgroundcolor: rgb(50, 150, 250)"
          icon="user"
        />
        <div>vuex中wrapper字段：{{this.$store.state.wrapper}}</div>
        <a-button class="color51" style="padding: 0 5px" type="link">{{
          info.name
        }}</a-button>
        <!-- <a-button type="link" @click="layout">退出</a-button> -->
      </div>
    </div>
    <div class="layout-asider">
      <a-menu
        mode="inline"
        @select="handleClick"
        :selectedKeys="[selectedKeys]"
        :openKeys="openKeys"
        @openChange="openChange"
      >
        <template v-for="item in menuList">
          <template v-if="item.children && item.children.length > 0">
            <a-sub-menu :key="item.key">
              <span slot="title">
                <img
                  :src="require(`../../assets/images/${item.activeLogo}`)"
                  alt
                  class="white"
                  v-if="item.activeLogo"
                />
                <img
                  :src="require(`../../assets/images/${item.logo}`)"
                  alt
                  class="black"
                  v-if="item.logo"
                />
                <span style="margin: 0 auto">{{ item.title }}</span>
              </span>
              <template v-for="it in item.children">
                <a-menu-item :key="it.key">{{ it.title }}</a-menu-item>
              </template>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="item.key">
              <img
                :src="require(`../../assets/images/${item.activeLogo}`)"
                alt
                class="white"
                v-if="item.activeLogo"
              />
              <img
                :src="require(`../../assets/images/${item.logo}`)"
                alt
                class="black"
                v-if="item.logo"
              />
              <span style="margin: 0 auto">{{ item.title }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
    <div class="layout-main">
      <div class="page-title" v-if="isBack || breadTitle">
        <a-button type="link" v-if="isBack" @click="$router.go(-1)">
          <a-icon type="left" />
          <span style="margin-left: 2px">返回</span>
        </a-button>
        <span v-if="isBack" style="font-size: 14px; margin-right: 15px">|</span>
        <span style="font-size: 14px">{{ breadTitle }}</span>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
import menu from "@/views/layoutManagement/menuList.js";
import html2canvas from "html2canvas";
import api from "@/api/api";
export default {
  data() {
    return {
      menuList: menu.backMenuList,
      isBack: false,
      breadTitle: "",
      info: {},
      selectedEntpId: "",
      selectedKeys: "/back",
      openKeys: [],
    };
  },
  watch: {
    $route(to, from) {
      const meta = to.meta;
      this.isBack = meta.isBack;
      this.breadTitle = meta.breadTitle;
      this.selectedKeys = this.$route.path;
    },
  },
  created() {
    console.log(this.menuList);
    // 匹配标题
    const meta = this.$route.meta;
    this.isBack = meta.isBack;
    this.breadTitle = meta.breadTitle;
    this.$bus.$on("changeBreadTitle", (msg) => {
      this.breadTitle = msg;
    });
    this.selectedKeys = this.$route.path;
    this.setOpenKeys();
    this.getInfo();
  },
  methods: {
    getInfo() {
      // api.getUserInfo().then((res) => {
      //   console.log(res);
      //   this.info = res
      // })
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({ name: "han", entpName: "ssss" })
      );
    },
    clickLogo() {
      // 截图当前整个页面并且下载
      // html2canvas(this.$refs.whole, {
      //   backgroundColor: "#ffffff"
      // }).then(canvas => {
      //   var imgData = canvas.toDataURL("image/jpeg");
      //   this.fileDownload(imgData);
      // });
    },
    fileDownload(downloadUrl) {
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = "当前页截图.png";
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
    handleClick(e) {
      this.$router.push({
        path: e.key,
      });
      this.selectedKeys = e.key;
    },
    openChange(val) {
      console.log(val);
      this.openKeys = val;
    },
    setOpenKeys() {
      const path = this.$route.path;
      console.log(path);
      // if (path.indexOf("/back/mode1") === 0) {
      //   this.openKeys = ["/back/mode1"];
      // }
      const parentMenu = menu.backMenuList.filter((item) => {
        return !!item.children;
      });
      this.openKeys = parentMenu.map((item) => {
        return item.key;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.back {
  .layout-header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 12px 1px rgba(42, 54, 70, 0.09);
    display: flex;
    align-items: center;
    padding: 0 10px;
    .layout-header-logo {
      flex: 1;
      img {
        height: 40px;
        padding-right: 10px;
      }
    }
    .layout-header-right {
      display: flex;
      align-items: center;
      height: 32px;
      .color51 {
        color: #333;
        cursor: default;
      }
    }
  }

  .layout-asider {
    position: fixed;
    z-index: 1;
    top: 52px;
    bottom: 0;
    left: 0;
    width: 147px;
    background: rgba(42, 54, 70, 1);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .layout-asider::-webkit-scrollbar {
    width: 0;
  }

  .layout-main {
    margin-left: 147px;
    padding: 52px 10px 10px 10px;
    min-height: 100vh;
    box-sizing: border-box;
    background: rgba(241, 242, 245, 1);
    .page-title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      color: rgba(77, 77, 77, 1);
      line-height: 38px;
    }
  }
}
</style>
<style lang="less">
.back {
  .layout-asider {
    .ant-menu {
      border: none;
      background-color: transparent;
      color: rgba(255, 255, 255, 0.5);
      .anticon {
        margin-right: 5px;
      }
      .ant-menu-submenu-title {
        padding-right: 24px;
      }
      .ant-menu-submenu-title .ant-menu-submenu-arrow {
        right: 10px;
      }
      .ant-menu-item,
      .ant-menu-submenu-title {
        transition: none;
        // -webkit-transition: none;
      }
      .ant-menu-submenu {
        transition: none;
        span {
          display: flex;
          align-items: center;
          .white {
            display: none;
          }
          .black {
            display: block;
            margin-right: 10px;
          }
        }
      }
      .ant-menu-submenu-active {
        span {
          display: flex;
          align-items: center;
          transition: none;
          .black {
            display: none;
          }
          .white {
            display: block;
            margin-right: 10px;
          }
        }
      }
      .ant-menu-submenu-selected {
        color: #ffffff;
        span {
          display: flex;
          align-items: center;
          transition: none;
          .black {
            display: none;
          }
          .white {
            display: block;
            margin-right: 10px;
          }
        }
      }
      .ant-menu-item {
        display: flex;
        align-items: center;
        transition: none;
        .white {
          display: none;
        }
        .black {
          display: block;
          margin-right: 10px;
        }
      }
      .ant-menu-item-active {
        .white {
          display: block;
          margin-right: 10px;
        }
        .black {
          display: none;
        }
      }
      .ant-menu-item-selected {
        color: rgba(255, 255, 255, 1);
        background-color: transparent;
        .white {
          display: block;
          margin-right: 10px;
        }
        .black {
          display: none;
        }
      }
      .ant-menu-submenu-title:hover,
      .ant-menu-item:hover {
        color: rgba(255, 255, 255, 1);
      }
      .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
      .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after {
        background: linear-gradient(to right, #fff, #fff);
      }
      .ant-menu-item:active,
      .ant-menu-submenu-title:active {
        background-color: transparent;
      }
      .ant-menu-item-selected::after {
        opacity: 0;
      }
      .ant-menu-submenu-title,
      .ant-menu-item {
        padding-left: 12px !important;
      }
      .ant-menu-sub > .ant-menu-item {
        padding-left: 28px !important;
        font-size: 12px;
      }
    }
  }
}
</style>