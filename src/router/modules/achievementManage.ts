/**
 * @author baoyuhao
 * @date 2022/11/23 17:28:10
 * @description
 * @version 0.1.0
 */

import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/achievementManage",
    name: "achievementManage",
    component: Layout,
    redirect: "/achievementManage/addForm",
    meta: { title: "成果征集", icon: "layers" },
    children: [
      {
        path: "addForm",
        name: "addForm",
        component: () => import("@/pages/teacher/achievementManage/addForm/index.vue"),
        meta: { title: "填写征集表", rolePermission: ["root", "teacher"] }
      },
      {
        path: "fixForm",
        name: "fixForm",
        component: () => import("@/pages/teacher/achievementManage/fixForm/index.vue"),
        meta: { title: "修改征集表", hidden: true, rolePermission: ["root", "teacher"] }
      }
    ]
  }
];