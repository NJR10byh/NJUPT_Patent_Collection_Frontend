import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

export default [
  {
    url: "/api/getFormList",
    method: "post",
    response: () => ({
      code: 200,
      message: "成功",
      data: {
        ...Mock.mock({
          "formList|1-100": [
            {
              id: "CG2022@natural(100000, 999999)T",
              achievementName: "成果征集表_@date(yyyyMMdd)@time(hhMMss)",
              achievementContractPerson: "@cname()",
              jobTitle: "@cword(2, 5)",
              "achievementContractPhone|1": ["133@natural(10000000, 99999999)", "198@natural(10000000, 99999999)", "189@natural(10000000, 99999999)"],
              achievementContractEmail: "@natural(1000000000, 9999999999)@qq.com",
              department: "@cword(5, 10)部",
              jobNumber: "@natural(1000000, 9000000)",
              "technicalMaturity|1": ["基本原理", "应用方案", "原理样机", "工程样机", "产业化阶段"],
              technicalClassification: "@cword(20, 100)",
              achievementIntroduce: "@cword(20, 100)",
              keyTechnologies: "@cword(20, 100)",
              fieldMarket: "@cword(20, 100)",
              achievementPrice: "@float(1,100,1,3)万元",
              "transformWay|1": ["技术转让", "技术开发", "技术咨询", "技术服务", "技术入股"],
              createUser: "@cname()",
              createTime: "@date(yyyy-MM-dd) @time(hh:MM:ss)",
              updateUser: "@cname()",
              updateTime: "@date(yyyy-MM-dd) @time(hh:MM:ss)"
            }
          ]
        })
      }
    })
  }
] as MockMethod[];
