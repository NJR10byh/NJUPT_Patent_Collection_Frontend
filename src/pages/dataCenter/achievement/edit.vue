<!--
  * @author baoyuhao
  * @date 2022/11/13 17:03:26
  * @description 
  * @version 0.1.0
-->
<template>
  <div class="detail-advanced">
    <t-card title="基本信息">
      <div class="info-block">
        <div class="info-item">
          <h1>成果名称</h1>
          <t-input v-model="formData.achievementName"></t-input>
        </div>
        <div class="info-item">
          <h1>成果联系人</h1>
          <t-input v-model="formData.achievementContactPerson"></t-input>
        </div>
        <div class="info-item">
          <h1>职称</h1>
          <t-input v-model="formData.jobTitle"></t-input>
        </div>
        <div class="info-item">
          <h1>电话</h1>
          <t-input v-model="formData.achievementContactPhone"></t-input>
        </div>
        <div class="info-item">
          <h1>Email</h1>
          <t-input v-model="formData.achievementContactEmail"></t-input>
        </div>
        <div class="info-item">
          <h1>所在学院</h1>
          <t-input v-model="formData.department"></t-input>
        </div>
        <div class="info-item">
          <h1>工号</h1>
          <t-input v-model="formData.jobNumber"></t-input>
        </div>
        <div class="info-item">
          <h1>技术成熟度</h1>
          <t-radio-group v-model="formData.technicalMaturity">
            <t-radio value="基本原理">基本原理</t-radio>
            <t-radio value="应用方案">应用方案</t-radio>
            <t-radio value="原理样机">原理样机</t-radio>
            <t-radio value="工程样机">工程样机</t-radio>
            <t-radio value="产业化阶段">产业化阶段</t-radio>
          </t-radio-group>
        </div>
        <div class="info-item">
          <h1>技术分类</h1>
          <t-textarea
            v-model="formData.technicalClassification"
            :maxlength="50"
          />
        </div>
        <div class="info-item">
          <h1>成果介绍</h1>
          <t-textarea
            v-model="formData.achievementIntroduce"
            :maxlength="50"
          />
        </div>
        <div class="info-item">
          <h1>关键技术</h1>
          <t-textarea
            v-model="formData.keyTechnologies"
            :maxlength="50"
          />
        </div>
        <div class="info-item">
          <h1>应用领域和市场</h1>
          <t-textarea
            v-model="formData.fieldMarket"
            :maxlength="50"
          />
        </div>
        <div class="info-item">
          <h1>成果估值金额</h1>
          <t-input v-model="formData.achievementPrice" suffix="万元" />
        </div>
        <div class="info-item">
          <h1>转化方式</h1>
          <t-checkbox-group v-model="checkList">
            <t-checkbox value="技术转让">技术转让</t-checkbox>
            <t-checkbox value="技术开发">技术开发</t-checkbox>
            <t-checkbox value="技术咨询">技术咨询</t-checkbox>
            <t-checkbox value="技术服务">技术服务</t-checkbox>
            <t-checkbox value="技术入股">技术入股</t-checkbox>
          </t-checkbox-group>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getFormById } from "@/api/list";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";

const router = useRouter();
const route = useRoute();

/**
 * data
 */
const formData = ref({
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
const checkList = ref([]);

/**
 * methods
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  console.log(route.query);
  // 获取数据详情
  fetchData();
});

const fetchData = async () => {
  let requestUrl = setObjToUrlParams("/form/getFormById", route.query);
  request.post({
    url: requestUrl
  }).then(res => {
    console.log(res);
    formData.value = res;
    console.log(formData.value);
  }).catch(err => {
    console.log(err);
  }).finally(() => {

  });
  checkList.value = formData.value.transformWay.split(",");
};

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>