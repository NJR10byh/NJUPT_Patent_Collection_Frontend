<template>
  <div>
    <!-- 搜索专利 -->
    <t-card class="addForm-card-container">
      <t-row justify="space-between" class="cardTop">
        <div class="cardTitle">搜索专利</div>
        <div>
          <t-radio-group variant="primary-filled" v-model="searchValue.authorize">
            <t-radio-button :value="true">已授权</t-radio-button>
            <t-radio-button :value="false">未授权</t-radio-button>
          </t-radio-group>
        </div>
      </t-row>
      <t-row justify="space-between" class="cardSearchArea">
        <t-input v-model="searchValue.zlmc" placeholder="专利名称" style="width: 45%;"></t-input>
        <t-input v-model="searchValue.cymd" placeholder="专利发明人" style="width: 45%;"></t-input>
        <t-button theme="primary" style="width: 8%;" @click="get_choose_patents()">
          <t-icon name="search"></t-icon>
          搜索
        </t-button>
      </t-row>
      <t-table
        :data="formListTableData"
        :columns="FORM_TABLE_COLUMNS"
        row-key="id"
        vertical-align="center"
        hover
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="tableLoading"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
        :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
        @page-change="rehandlePageChange"
        @select-change="rehandleSelectChange"
        style="margin-top: 10px"
      >
        <template #settings="slotProps">
          <t-button theme="success" @click="getFormInfo(slotProps.row)">
            <t-icon name="check"></t-icon>
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
        :data="formListTableData"
        :columns="FORM_TABLE_COLUMNS"
        row-key="id"
        vertical-align="center"
        hover
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="tableLoading"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
        :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
        @page-change="rehandlePageChange"
        @select-change="rehandleSelectChange"
        style="margin-top: 10px"
      >
        <template #settings="slotProps">
          <t-button theme="danger" @click="getFormInfo(slotProps.row)">
            <t-icon name="delete"></t-icon>
          </t-button>
        </template>
      </t-table>
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
import { FORM_TABLE_COLUMNS } from "./constants";

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
  pageSize: 5,
  current: 1,
  showPageSize: false
});
// 查询表格
const searchValue = ref({
  currPage: pagination.value.current,
  size: pagination.value.pageSize,
  authorize: true, // 是否授权
  zlmc: "",// 专利名称
  cymd: "" // 成员名单
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
      formListTableData.value[i].index = (pagination.value.current - 1) * pagination.value.pageSize + i + 1;
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

.addForm-card-container {
  &:nth-child(2) {
    margin-top: 10px;
  }

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
