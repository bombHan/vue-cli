export default [{
    path: '/',
    redirect: '/back'
  }, {
    path: "/login",
    name: "login",
    alias: "",
    component: () => import("@/views/loginManagement/login.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  },
  {
    path: "/back",
    component: () => import("@/views/layoutManagement/back"),
    redirect: '/back/homepage',
    children: [
      {
        path: "homepage",
        name: "homepage",
        component: () => import("@/views/back/homepage/homepage.vue"),
        meta: {
          isBack: false,
          breadTitle: "后台首页",
        },
      },{
      path: "mode1/test",
      name: "mode1/test",
      component: () => import("@/views/back/test/test.vue"),
      meta: {
        isBack: true,
        breadTitle: "后台test页面",
      },
    },]
  },
  {
    path: "/front",
    component: () => import("@/views/layoutManagement/front"),
    redirect: '/front/homepage',
    children: [{
      path: "homepage",
      name: "homepage",
      component: () => import("@/views/front/homepage/homepage.vue"),
      meta: {
        isBack: false,
        breadTitle: "前台首页",
      },
    }]
  },
];