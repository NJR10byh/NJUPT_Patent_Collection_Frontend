<template>
  <div>
    <t-card class="list-card-container">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <p v-if="!!selectedRowKeys.length" class="selected-count">
            已选{{ selectedRowKeys.length }}项
          </p>
        </div>
        <div class="search-input">
          <t-input
            class="searchInputStyle"
            v-model="searchValue.achievementName"
            placeholder="成果名称"
            clearable
          ></t-input>
          <t-input
            class="searchInputStyle"
            v-model="searchValue.achievementContactPerson"
            placeholder="成果联系人"
            clearable
          ></t-input>
          <t-input
            class="searchInputStyle"
            v-model="searchValue.jobNumber"
            placeholder="工号"
            clearable
          ></t-input>
          <t-button class="searchBtnStyle" @click="searchForm">
            <t-icon name="search"></t-icon>
            查询
          </t-button>
        </div>
      </t-row>
      <t-table
        :data="formListTableData"
        :columns="FORM_TABLE_COLUMNS"
        row-key="id"
        vertical-align="center"
        hover
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
        :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
        @page-change="rehandlePageChange"
        @select-change="rehandleSelectChange"
        style="margin-top: 20px"
      >
        <template #settings="slotProps">
          <t-button theme="primary" @click="getFormInfo(slotProps.row)">
            查看
          </t-button>
          <t-button theme="warning" @click="editForm(slotProps.row)">
            修改
          </t-button>
          <t-popconfirm
            content="确认删除吗?"
            theme="danger"
            @confirm="deleteForm(slotProps.row)"
          >
            <t-button theme="danger">删除</t-button>
          </t-popconfirm>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";
import { getFormList } from "@/api/list";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";

import { FORM_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";

const store = useSettingStore();
const router = useRouter();

/**
 * data
 */
/**
 * 表格相关
 */
// 表格加载
const dataLoading = ref(false);
// 表格数据
const formListTableData = ref([]);
// 表格分页
const pagination = ref({
  total: 0,
  pageSize: 20,
  current: 1
});
// 查询表格
const searchValue = ref({
  pageNum: pagination.value.current,
  pageSize: pagination.value.pageSize,
  achievementName: "", // 成果名称
  achievementContactPerson: "", // 成果联系人
  jobNumber: "" // 工号
});
// 已选择的row
const selectedRowKeys = ref([]);
// 根据是否使用多Tab页判断offsetTop
const offsetTop = computed(() => {
  return store.isUseTabsRouter ? 48 : 0;
});
// 获取当前容器
const getContainer = () => {
  return document.querySelector(`.${prefix}-layout`);
};

/**
 * methods
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取表格数据
  const requestUrl = "/question/searchQuestion";
  getFormData(requestUrl);
});
// 获取表格数据
const getFormData = async (requestUrl) => {
  dataLoading.value = true;
  request.post({
    url: requestUrl,
    data: searchValue.value
  }).then(res => {
    console.log(res);
    formListTableData.value = res.records;
    pagination.value.total = res.total;
    for (let i = 0; i < formListTableData.value.length; i++) {
      formListTableData.value[i].index = pagination.value.current * i + i + 1;
    }
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    dataLoading.value = false;
  });
};
// 查询征集表
const searchForm = () => {
  const requestUrl = "/question/searchQuestion";
  searchValue.value.pageNum = 1;
  searchValue.value.pageSize = 20;
  getFormData(requestUrl);
};
// 查看详情
const getFormInfo = (row) => {
  console.log(row.id);
  router.push({
    path: "/dataCenter/detail",
    query: { formID: row.id }
  });
};
// 修改
const editForm = (row) => {
  console.log(row.id);
  router.push({
    path: "/dataCenter/edit",
    query: { formID: row.id }
  });
};
// 删除
const deleteForm = (row) => {
  console.log(row.id);
};


/**
 * 表格操作钩子
 * @param val
 */
// 表格选择钩子
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val;
};
// 分页钩子
const rehandlePageChange = (curr) => {
  console.log("分页变化", curr);
  const requestUrl = "/question/searchQuestion";
  searchValue.value.pageNum = curr.current;
  searchValue.value.pageSize = curr.pageSize;
  pagination.value.current = curr.current;
  pagination.value.pageSize = curr.pageSize;
  getFormData(requestUrl);
};
</script>

<style lang="less" scoped>
.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}

.left-operation-container {
  padding-top: 6px;

  .selected-count {
    display: inline-block;
    margin-left: 8px;
    color: var(--td-text-color-secondary);
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
