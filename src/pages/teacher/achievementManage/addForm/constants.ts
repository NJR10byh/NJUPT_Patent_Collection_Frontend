/**
 * @author baoyuhao
 * @date 2022/11/27 23:07:46
 * @description
 * @version 0.1.0
 */

export const PATENT_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 64, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 80
  },
  {
    title: "专利号",
    align: "left",
    colKey: "zlh",
    width: 250,
    ellipsis: true
  },
  {
    title: "成果名称",
    align: "left",
    colKey: "achievementName",
    width: 250,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 250,
    ellipsis: true
  },
  {
    fixed: "right",
    colKey: "settings",
    width: 100,
    title: "操作"
  }
];

export const CHOOSED_PATENT_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 80
  },
  {
    title: "专利号",
    align: "left",
    colKey: "zlh",
    width: 250,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
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
    title: "职称",
    colKey: "jobTitle",
    width: 150,
    ellipsis: true
  },
  {
    title: "电话",
    colKey: "achievementContactPhone",
    width: 150,
    ellipsis: true
  },
  {
    title: "Email",
    colKey: "achievementContactEmail",
    width: 200,
    ellipsis: true
  },
  {
    title: "所在学院",
    colKey: "department",
    width: 200,
    ellipsis: true
  },
  {
    title: "工号",
    colKey: "jobNumber",
    width: 150,
    ellipsis: true
  },
  {
    title: "技术成熟度",
    colKey: "technicalMaturity",
    width: 200,
    ellipsis: true
  },
  {
    title: "技术分类",
    colKey: "technicalClassification",
    width: 200,
    ellipsis: true
  },
  {
    title: "成果介绍",
    colKey: "achievementIntroduce",
    width: 200,
    ellipsis: true
  },
  {
    title: "关键技术",
    colKey: "keyTechnologies",
    width: 200,
    ellipsis: true
  },
  {
    title: "应用领域和市场",
    colKey: "fieldMarket",
    width: 200,
    ellipsis: true
  },
  {
    title: "成果估值金额",
    colKey: "achievementPrice",
    width: 200,
    ellipsis: true
  },
  {
    title: "转化方式",
    colKey: "transformWay",
    width: 200,
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
    width: 100,
    title: "操作"
  }
];