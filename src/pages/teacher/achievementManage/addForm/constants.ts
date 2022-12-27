/**
 * @author baoyuhao
 * @date 2022/11/27 23:07:46
 * @description
 * @version 0.1.0
 */

export const PATENT_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
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