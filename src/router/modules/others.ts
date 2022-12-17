import Layout from "@/layouts/index.vue";

export default [
  // {
  //   path: "/login",
  //   name: "Login",
  //   redirect: "/index",
  //   meta: { title: "登录页", icon: LogoutIcon, hidden: true },
  //   component: () => import("@/layouts/blank.vue"),
  //   children: [
  //     {
  //       path: "index",
  //       name: "LoginIndex",
  //       component: () => import("@/layouts/blank.vue"),
  //       meta: { title: "登录中心" }
  //     }
  //   ]
  // },
  {
    path: "/userCenter",
    name: "userCenter",
    component: Layout,
    redirect: "/userCenter/info",
    meta: { title: "个人中心", icon: "user-circle", hidden: true },
    children: [
      {
        path: "info",
        name: "UserInfo",
        component: () => import("@/pages/user/index.vue"),
        meta: { title: "个人中心", hidden: true, rolePermission: ["root", "teacher", "cxy"] }
      }
    ]
  }
];
