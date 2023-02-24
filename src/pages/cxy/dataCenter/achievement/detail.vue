<!--
  * @author baoyuhao
  * @date 2022/11/12 17:13:28
  * @description
  * @version 0.1.0
-->
<template>
  <div class=" detail-advanced">
    <t-card class="card-container detailForm-card">
      <t-row justify="space-between" class="cardTop">
        <div class="cardTitle">成果征集表详情</div>
      </t-row>
      <div class="info-block">
        <div class="info-item">
          <h1>成果名称</h1>
          {{ formData.achievementName }}
        </div>
        <div class="info-item">
          <h1>成果联系人</h1>
          {{ formData.achievementContactPerson }}
        </div>
        <div class="info-item">
          <h1>职称</h1>
          {{ formData.jobTitle }}
        </div>
        <div class="info-item">
          <h1>电话</h1>
          {{ formData.achievementContactPhone }}
        </div>
        <div class="info-item">
          <h1>Email</h1>
          {{ formData.achievementContactEmail }}
        </div>
        <div class="info-item">
          <h1>所在学院</h1>
          {{ formData.department }}
        </div>
        <div class="info-item">
          <h1>工号</h1>
          {{ formData.jobNumber }}
        </div>
        <div class="info-item">
          <h1>技术成熟度</h1>
          {{ formData.technicalMaturity }}
        </div>
        <div class="info-item">
          <h1>技术分类</h1>
          <t-textarea
            v-model="formData.technicalClassification"
            readonly
          />
        </div>
        <div class="info-item">
          <h1>成果介绍</h1>
          <t-textarea
            v-model="formData.achievementIntroduce"
            readonly
          />
        </div>
        <div class="info-item">
          <h1>关键技术</h1>
          <t-textarea
            v-model="formData.keyTechnologies"
            readonly
          />
        </div>
        <div class="info-item">
          <h1>应用领域和市场</h1>
          <t-textarea
            v-model="formData.fieldMarket"
            readonly
          />
        </div>
        <div class="info-item">
          <h1>成果估值金额</h1>
          {{ formData.achievementPrice }} 万元
        </div>
        <div class="info-item">
          <h1>转化方式</h1>
          {{ formData.transformWay }}
        </div>
        <div class="info-item">
          <h1>创建人</h1>
          {{ formData.createUser }}
        </div>
        <div class="info-item">
          <h1>创建时间</h1>
          {{ formData.createTime }}
        </div>
        <div class="info-item">
          <h1>更新人</h1>
          {{ formData.updateUser }}
        </div>
        <div class="info-item">
          <h1>更新时间</h1>
          {{ formData.updateTime }}
        </div>
      </div>
    </t-card>

    <!-- 专利列表 -->
    <t-card class="card-container choosedPatents-card">
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
      >
      </t-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { CHOOSED_PATENT_TABLE_COLUMNS } from "@/pages/cxy/dataCenter/achievement/constants";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";

const router = useRouter();
const route = useRoute();
const store = useSettingStore();

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
 * 表单相关
 */
const formData = ref(
  {
    id: null,
    patentList: [],
    achievementName: "",
    achievementContactPerson: "",
    jobTitle: "",
    achievementContactPhone: "",
    achievementContactEmail: "",
    department: "",
    jobNumber: "",
    technicalMaturity: "",
    technicalClassification: "",
    achievementIntroduce: "",
    keyTechnologies: "",
    fieldMarket: "",
    achievementPrice: null,
    transformWay: "",
    createUser: "",
    createTime: "",
    updateUser: "",
    updateTime: ""
  }
);
/**
 * 表格相关
 */
/* 教师选择的专利 */
const choosedPatentTable = ref({
  tableLoading: false,// 表格加载
  tableData: []// 表格数据
});

/**
 * methods
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  console.log(route.query);
  // 获取数据详情
  getFormDetail();
});

const getFormDetail = async () => {
  let requestUrl = setObjToUrlParams("/form/getFormById", route.query);
  await request.post({
    url: requestUrl
  }).then(res => {
    formData.value = {
      ...res,
      technicalClassification: res.technicalClassification.replace(/&#10;/g, "\n"),
      achievementIntroduce: res.achievementIntroduce.replace(/&#10;/g, "\n"),
      keyTechnologies: res.keyTechnologies.replace(/&#10;/g, "\n"),
      fieldMarket: res.fieldMarket.replace(/&#10;/g, "\n")
    };
    console.log(formData.value);
  }).catch(err => {
    console.log(err);
  }).finally(() => {

  });
  for (let i = 0; i < formData.value.patentList.length; i++) {
    let obj = {
      wid: formData.value.patentList[i]
    };
    let requestUrl = setObjToUrlParams("/patent/getPatentByWid", obj);
    await request.post({
      url: requestUrl
    }).then(res => {
      console.log(res);
      choosedPatentTable.value.tableData.push(res);
      for (let i = 0; i < choosedPatentTable.value.tableData.length; i++) {
        choosedPatentTable.value.tableData[i].index = i + 1;
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {

    });
  }
};

</script>

<style lang="less" scoped>
@import url('index.less');

.card-container {
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
}

.detailForm-card {
  .info-block {
    margin-top: 10px;
  }
}
</style>
