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

// 专利列表
export const CHOOSED_PATENT_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "专利号",
    align: "left",
    colKey: "zlh",
    width: 120,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 300,
    ellipsis: true
  },
  {
    title: "授权日期",
    align: "center",
    colKey: "zlsqrq",
    width: 100,
    ellipsis: true
  },
  {
    title: "专利权人",
    align: "center",
    colKey: "zlqr",
    width: 150,
    ellipsis: true
  },
  {
    title: "最后更新日期",
    align: "center",
    colKey: "zhgxsj",
    width: 100,
    ellipsis: true
  },
  {
    fixed: "right",
    align: "center",
    colKey: "settings",
    width: 50,
    title: "操作"
  }
];