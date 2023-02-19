<template>
  <div>
    <!-- 搜索专利 -->
    <t-card class="addForm-card-container">
      <t-row justify="space-between" class="cardTop">
        <div class="cardTitle">搜索专利</div>
        <div>
          <t-radio-group variant="primary-filled" v-model="patentTable.searchValue.searchCondition.authorize"
                         @change="getPatentData('/patent/getPatentPageByCondition')">
            <t-radio-button :value="true">已授权</t-radio-button>
            <t-radio-button :value="false">未授权</t-radio-button>
          </t-radio-group>
        </div>
      </t-row>
      <t-row justify="space-between" class="cardSearchArea">
        <t-input v-model="patentTable.searchValue.searchCondition.zlh" placeholder="专利号"
                 style="width: 45%;" clearable></t-input>
        <t-input v-model="patentTable.searchValue.searchCondition.zlmc" placeholder="专利名称"
                 style="width: 45%;" clearable></t-input>
        <t-button theme="primary" style="width: 8%;font-weight: bold;"
                  @click="getPatentData('/patent/getPatentPageByCondition')">
          <template #icon>
            <SearchIcon />
          </template>
          搜索
        </t-button>
      </t-row>
      <t-table
        :data="patentTable.tableData"
        :columns="PATENT_TABLE_COLUMNS"
        row-key="id"
        vertical-align="center"
        hover
        :pagination="patentTable.pagination"
        :loading="patentTable.tableLoading"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
        :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
        @page-change="patentTablePageChange"
        style="margin-top: 10px"
        size="small"
      >
        <template #settings="slotProps">
          <t-button theme="success" @click="getFormInfo(slotProps.row)">
            <template #icon>
              <CheckIcon />
            </template>
          </t-button>
        </template>
      </t-table>
    </t-card>

    <!-- 已选择专利 -->
    <t-card class="addForm-card-container">
      <t-row justify="space-between" class="cardTop">
        <div class="cardTitle">已选择专利</div>
      </t-row>
      <t-table
        :data="choosedPatentTable.tableData"
        :columns="CHOOSED_PATENT_TABLE_COLUMNS"
        row-key="id"
        vertical-align="center"
        hover
        :loading="choosedPatentTable.tableLoading"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
        style="margin-top: 10px"
        size="small"
      >
        <template #settings="slotProps">
          <t-button theme="danger" @click="getFormInfo(slotProps.row)">
            <template #icon>
              <DeleteIcon />
            </template>
          </t-button>
        </template>
      </t-table>
    </t-card>

    <!-- 成果征集信息 -->
    <t-card class="addForm-card-container">
      <t-row justify="space-between" class="cardTop">
        <div class="cardTitle">成果征集信息</div>
      </t-row>
      <t-form
        ref="form"
        :data="formInfo"
        :rules="formRules"
        :colon="true"
        label-width="120px"
        layout="inline"
        scroll-to-first-error="smooth"
        @submit="onSubmit"
        style="margin-top: 20px;"
      >
        <t-form-item label="成果名称" name="achievementName">
          <t-input placeholder="请输入成果名称" v-model="formInfo.achievementName" style="width:300px"
                   :maxlength="100" show-word-limit>
          </t-input>
        </t-form-item>
        <t-form-item label="成果联系人" name="achievementContactPerson">
          <t-input placeholder="请输入成果联系人" v-model="formInfo.achievementContactPerson" style="width:200px"
                   :maxlength="20" show-word-limit>
          </t-input>
        </t-form-item>
        <t-form-item label="职称" name="jobTitle">
          <t-input placeholder="请输入职称" v-model="formInfo.jobTitle" style="width:200px" :maxlength="20"
                   show-word-limit>
          </t-input>
        </t-form-item>
        <t-form-item label="电话" name="achievementContactPhone">
          <t-input type="number" placeholder="请输入手机号" v-model="formInfo.achievementContactPhone"
                   style="width:200px">
          </t-input>
        </t-form-item>
        <t-form-item label="E-mail" name="achievementContactEmail">
          <t-input placeholder="请输入电子邮件" v-model="formInfo.achievementContactEmail" style="width:300px">
          </t-input>
        </t-form-item>
        <t-form-item label="所在学院" name="department">
          <t-input placeholder="请输入所在学院" v-model="formInfo.department" style="width:300px"
                   :maxlength="30" show-word-limit>
          </t-input>
        </t-form-item>
        <t-form-item label="工号" name="jobNumber">
          <t-input placeholder="请输入工号" v-model="formInfo.jobNumber" style="width:200px" :maxlength="20"
                   show-word-limit>
          </t-input>
        </t-form-item>
        <t-form-item label="技术成熟度" name="technicalMaturity" style="width:100%">
          <t-radio-group v-model="formInfo.technicalMaturity">
            <t-radio label="基本原理" value="基本原理" />
            <t-radio label="应用方案" value="应用方案" />
            <t-radio label="原理样机" value="原理样机" />
            <t-radio label="工程样机" value="工程样机" />
            <t-radio label="产业化阶段" value="产业化阶段" />
          </t-radio-group>
        </t-form-item>
        <t-form-item label="技术分类" name="technicalClassification">
          <t-textarea v-model="formInfo.technicalClassification"
                      placeholder="新一代信息技术、高端装备制造、节能环保、新能源、新材料、现代农业、生物医药、其他&#10;信息材料、信息器件、信息网络、信息系统、信息应用、其他"
                      :maxlength="100"
                      style="width:400px" />
        </t-form-item>
        <t-form-item label="成果介绍" name="achievementIntroduce">
          <t-textarea v-model="formInfo.achievementIntroduce" placeholder="请输入成果介绍" :maxlength="100"
                      style="width:400px" />
        </t-form-item>
        <t-form-item label="关键技术" name="keyTechnologies">
          <t-textarea v-model="formInfo.keyTechnologies" placeholder="请输入关键技术" :maxlength="100"
                      style="width:400px" />
        </t-form-item>
        <t-form-item label="应用领域和市场" name="fieldMarket">
          <t-textarea v-model="formInfo.fieldMarket" placeholder="请输入应用领域和市场" :maxlength="100"
                      style="width:400px" />
        </t-form-item>
        <t-form-item label="成果估值金额" name="achievementPrice">
          <t-input-adornment append="万元">
            <t-input type="number" placeholder="请输入成果估值金额" v-model="formInfo.achievementPrice" />
          </t-input-adornment>
        </t-form-item>
        <t-form-item label="转化方式" name="transformWay" style="width:100%">
          <t-checkbox-group v-model="transformWayCheckList" @change="transformWayChange">
            <t-checkbox :check-all="true" label="全选" />
            <t-checkbox label="技术转让" value="技术转让" />
            <t-checkbox label="技术开发" value="技术开发" />
            <t-checkbox label="技术咨询" value="技术咨询" />
            <t-checkbox label="技术服务" value="技术服务" />
            <t-checkbox label="技术入股" value="技术入股" />
          </t-checkbox-group>
        </t-form-item>

        <t-form-item label-width="0" style="width: 100%;display: flex;justify-content: center;align-items: center;">
          <t-space>
            <t-button theme="primary" type="submit">提交</t-button>
            <t-button theme="default" variant="base" type="reset">重置</t-button>
            <!--            <t-button theme="default" variant="base" @click="initForm">初始化表单</t-button>-->
          </t-space>
        </t-form-item>
      </t-form>
    </t-card>


  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import { CHOOSED_PATENT_TABLE_COLUMNS, PATENT_TABLE_COLUMNS } from "./constants";
import { CheckIcon, DeleteIcon, SearchIcon } from "tdesign-icons-vue-next";
import { validateEmail, validateMobilePhone } from "@/utils/validate";
import { MessagePlugin } from "tdesign-vue-next";
import { request } from "@/utils/request";

const store = useSettingStore();
const router = useRouter();

/**
 * data
 */
// 根据是否使用多Tab页判断offsetTop
const offsetTop = computed(() => {
  return store.isUseTabsRouter ? 48 : 0;
});
// 获取当前容器
const getContainer = () => {
  return document.querySelector(`.${prefix}-layout`);
};
/**
 * 表格相关
 */
/* 搜索专利 */
const patentTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
    showPageSize: false
  },
  // 查询专利
  searchValue: {
    currPage: 1,
    size: 10,
    searchCondition: {
      authorize: true,// 是否授权
      zlh: "",// 专利号
      zlmc: ""// 专利名称
    }
  }
});
/* 已选择专利 */
const choosedPatentTable = ref({
  tableLoading: false,// 表格加载
  tableData: []// 表格数据
});

/**
 * 成果征集表内容
 */
const form = ref(null);
//成果征集表内容
const formInfo = ref({
  patentList: "1001,1167,928", // 专利ID集合

  achievementName: "成果名称",// 成果名称
  achievementContactPerson: "成果联系人",// 成果联系人
  jobTitle: "",// 职称
  achievementContactPhone: "13698007635",// 联系方式-电话
  achievementContactEmail: "123@qq.com",// 联系方式-Email
  department: "",// 所在学院
  jobNumber: "1322040001",// 工号
  technicalMaturity: "",// 技术成熟度
  technicalClassification: "",// 技术分类
  achievementIntroduce: "43423\ndsdsd\n22",// 成果介绍
  keyTechnologies: "",// 关键技术
  fieldMarket: "",// 应用领域和市场
  achievementPrice: null,// 成果估值金额
  transformWay: ""// 转化方式
});
// 成果征集表单校验规则
const formRules = ref({
  achievementName: [
    { required: true, message: "成果名称必填", type: "error" }
  ],
  achievementContactPerson: [
    { required: true, message: "成果联系人必填", type: "error" }
  ],
  achievementContactPhone: [
    { required: true, validator: validateMobilePhone, trigger: "blur" }
  ],
  achievementContactEmail: [
    { required: true, validator: validateEmail, trigger: "blur" }
  ],
  jobNumber: [
    { required: true, message: "工号必填", type: "error" }
  ]
});
// 转化方式CheckList
const transformWayCheckList = ref([]);

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取表格数据
  const requestUrl = "/patent/getPatentPageByCondition";
  getPatentData(requestUrl);
});
/**
 * 操作钩子
 */
// 分页钩子
const patentTablePageChange = (curr) => {
  console.log("分页变化", curr);
  const requestUrl = "/patent/getPatentPageByCondition";
  patentTable.value.searchValue.currPage = curr.current;
  patentTable.value.searchValue.size = curr.pageSize;
  patentTable.value.pagination.current = curr.current;
  patentTable.value.pagination.pageSize = curr.pageSize;
  getPatentData(requestUrl);
};
// "转让方式"多选change钩子
const transformWayChange = () => {
  console.log(transformWayCheckList.value);
  if (transformWayCheckList.value.length == 0) {
    formInfo.value.transformWay = "";
  } else {
    formInfo.value.transformWay = transformWayCheckList.value.join(",");
  }
  console.log(formInfo.value.transformWay);
};

/**
 * 业务相关methods
 */
// 获取专利数据
const getPatentData = async (requestUrl) => {
  patentTable.value.tableLoading = true;
  request.post({
    url: requestUrl,
    data: patentTable.value.searchValue
  }).then(res => {
    console.log(res);
    patentTable.value.pagination.total = res.total;
    patentTable.value.tableData = res.records;
    for (let i = 0; i < patentTable.value.tableData.length; i++) {
      patentTable.value.tableData[i].index = (patentTable.value.pagination.current - 1) * patentTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    patentTable.value.tableLoading = false;
  });
};

// 提交表单
const onSubmit = ({ validateResult, firstError, e }) => {
  e.preventDefault();
  console.log({ validateResult, firstError, e });
  if (validateResult === true) {
    console.log(formInfo.value);
    let requestUrl = "/form/addForm";
    formInfo.value = {
      ...formInfo.value,
      technicalClassification: formInfo.value.technicalClassification.replace(/\n/g, "&#10;"),
      achievementIntroduce: formInfo.value.achievementIntroduce.replace(/\n/g, "&#10;"),
      keyTechnologies: formInfo.value.keyTechnologies.replace(/\n/g, "&#10;"),
      fieldMarket: formInfo.value.fieldMarket.replace(/\n/g, "&#10;")
    };
    request.post({
      url: requestUrl,
      data: formInfo.value
    }).then(res => {
      MessagePlugin.success(res);
      form.value.reset();
      transformWayCheckList.value = [];
      router.push("/dataCenter/achievement");
    }).catch(err => {
      console.log(err);
    }).finally(() => {
    });
  } else {
    console.log("Validate Errors: ", firstError, validateResult);
    MessagePlugin.error(firstError);
  }
};
</script>

<style lang="less" scoped>

.addForm-card-container {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .cardSearchArea {
    margin-top: 10px;
  }

}

.search-input {
  //border: 1px solid red;
  display: flex;

  .searchInputStyle,
  .searchBtnStyle {
    margin-left: 8px;
  }

  .searchBtnStyle {
    width: 180px;
  }
}
</style>
