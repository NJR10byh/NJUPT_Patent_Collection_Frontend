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
        component: () => import("@/pages/dataCenter/achievement/index.vue"),
        meta: { title: "成果征集库" }
      },
      {
        path: "detail",
        name: "achievementDetail",
        component: () => import("@/pages/dataCenter/achievement/detail.vue"),
        meta: { title: "成果征集表详情", hidden: true }
      }
    ]
  }
];
