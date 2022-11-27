<!--
  * @author baoyuhao
  * @date 2022/11/12 17:13:28
  * @description
  * @version 0.1.0
-->
<template>
  <div class="detail-advanced">
    <t-card title="成果征集表详情">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";

const router = useRouter();
const route = useRoute();

/**
 * data
 */
const formData = ref(
  {
    id: null,
    patentList: "",
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
 * methods
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  console.log(route.query);
  // 获取数据详情
  getFormDetail();
});

const getFormDetail = () => {
  let requestUrl = setObjToUrlParams("/form/getFormById", route.query);
  request.post({
    url: requestUrl
  }).then(res => {
    console.log(res);
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
};

</script>

<style lang="less" scoped>
@import url('index.less');
</style>
