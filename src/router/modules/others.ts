import Layout from "@/layouts/index.vue";
import LogoutIcon from "@/assets/assets-slide-logout.svg";

export default [
  {
    path: "/user",
    name: "user",
    component: Layout,
    redirect: "/user/index",
    meta: { title: "个人页", icon: "user-circle", hidden: true },
    children: [
      {
        path: "index",
        name: "UserIndex",
        component: () => import("@/pages/user/index.vue"),
        meta: { title: "个人中心" }
      }
    ]
  },
  {
    path: "/loginRedirect",
    name: "loginRedirect",
    redirect: "/login",
    meta: { title: "登录页", icon: LogoutIcon, hidden: true },
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "index",
        redirect: "/login",
        component: () => import("@/layouts/blank.vue"),
        meta: { title: "登录中心" }
      }
    ]
  }
];
