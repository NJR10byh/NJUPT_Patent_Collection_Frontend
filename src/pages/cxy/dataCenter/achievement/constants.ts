// index.vue tableColumns
export const FORM_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 64, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 80
  },
  {
    title: "成果名称",
    align: "left",
    colKey: "achievementName",
    width: 250,
    ellipsis: true
  },
  {
    title: "成果联系人",
    align: "left",
    colKey: "achievementContactPerson",
    width: 150,
    ellipsis: true
  },
  {
    title: "工号",
    colKey: "jobNumber",
    width: 150,
    ellipsis: true
  },
  {
    title: "创建人",
    colKey: "createUser",
    width: 150,
    ellipsis: true
  },
  {
    title: "创建时间",
    colKey: "createTime",
    width: 200,
    ellipsis: true
  },
  {
    title: "更新人",
    colKey: "updateUser",
    width: 150,
    ellipsis: true
  },
  {
    title: "更新时间",
    colKey: "updateTime",
    width: 200,
    ellipsis: true
  },
  {
    fixed: "right",
    colKey: "settings",
    width: 260,
    title: "操作"
  }
];