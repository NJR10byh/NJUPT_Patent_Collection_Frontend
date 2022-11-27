import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/dataCenter",
    name: "dataCenter",
    component: Layout,
    redirect: "/dataCenter/achievement",
    meta: { title: "数据中心", icon: "server" },
    children: [
      {
        path: "achievement",
        name: "achievementDatabase",
        component: () => import("@/pages/cxy/dataCenter/achievement/index.vue"),
        meta: { title: "成果征集库" }
      },
      {
        path: "detail",
        name: "achievementDetail",
        component: () => import("@/pages/cxy/dataCenter/achievement/detail.vue"),
        meta: { title: "成果征集表详情", hidden: true }
      },
      {
        path: "edit",
        name: "achievementEdit",
        component: () => import("@/pages/cxy/dataCenter/achievement/edit.vue"),
        meta: { title: "修改成果征集表", hidden: true }
      }
    ]
  }
];
