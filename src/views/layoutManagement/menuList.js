const backMenuList = [
  {
    key: "/back/homepage",
    title: '后台首页',
  },
  {
    key: "/back/mode1",
    title: '后台mode1',
    children: [
      {
        key: "/back/mode1/test",
        title: '后台test页面',
      },
    ]
  },
];

const frontMenuList = [
  {
    key: "/front/homepage",
    title: '前台首页',
  },

];
export default {backMenuList, frontMenuList};