<template>
  <div>
    <t-card class="list-card-container">
      <t-row justify="space-between">

      </t-row>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";

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
  currPage: pagination.value.current,
  size: pagination.value.pageSize
  // achievementName: "", // 成果名称
  // achievementContactPerson: "", // 成果联系人
  // jobNumber: "" // 工号
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
  const requestUrl = "/form/getFormPage";
  getFormData(requestUrl);
});
// 获取表格数据
const getFormData = async (requestUrl) => {
  dataLoading.value = true;
  requestUrl = setObjToUrlParams(requestUrl, searchValue.value);
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
  const requestUrl = "/form/getFormPage";
  searchValue.value.currPage = 1;
  searchValue.value.size = 20;
  getFormData(requestUrl);
};
// 查看详情
const getFormInfo = (row) => {
  console.log(row);
  router.push({
    path: "/dataCenter/detail",
    query: { id: row.id }
  });
};
// 修改
const editForm = (row) => {
  console.log(row.id);
  router.push({
    path: "/dataCenter/edit",
    query: { id: row.id }
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
  const requestUrl = "/form/getFormPage";
  searchValue.value.currPage = curr.current;
  searchValue.value.size = curr.pageSize;
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
