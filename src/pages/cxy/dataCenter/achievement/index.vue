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
            v-model="searchValue.searchCondition.achievementName"
            placeholder="成果名称"
            clearable
          ></t-input>
          <t-input
            class="searchInputStyle"
            v-model="searchValue.searchCondition.achievementContactPerson"
            placeholder="成果联系人"
            clearable
          ></t-input>
          <t-input
            class="searchInputStyle"
            v-model="searchValue.searchCondition.jobNumber"
            placeholder="工号"
            clearable
          ></t-input>
          <t-button class="searchBtnStyle" @click="searchForm">
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
        :loading="tableLoading"
        :selected-row-keys="selectedRowKeys"
        :expanded-row-keys="expandedRowKeys"
        :expanded-row="expandedRow"
        :expand-on-row-click="expandOnRowClick"
        :expand-icon="expandIcon"
        :header-affixed-top="{ offsetTop, container: getContainer }"
        :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
        :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
        @page-change="rehandlePageChange"
        @select-change="rehandleSelectChange"
        @expand-change="rehandleExpandChange"
        style="margin-top: 20px"
      >
        <template #settings="slotProps">
          <t-button theme="primary" @click="getFormInfo(slotProps.row)">
            查看
          </t-button>
          <!--          <t-button theme="warning" @click="editForm(slotProps.row)">-->
          <!--            修改-->
          <!--          </t-button>-->
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

<script setup lang="jsx">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";

import { FORM_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";

const store = useSettingStore();
const router = useRouter();

/**
 * data
 */
/**
 * 表格相关
 */
// 表格加载
const tableLoading = ref(false);
// 表格数据
const formListTableData = ref([]);
// 表格分页
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 20
});
// 查询表格
const searchValue = ref({
  currPage: 1,
  size: 20,
  searchCondition: {
    achievementName: "", // 成果名称
    achievementContactPerson: "", // 成果联系人
    jobNumber: "" // 工号
  }
});
// 是否允许点击表格行时展开
const expandOnRowClick = ref(true);
// 不显示图标
const expandIcon = ref(false);
// 已选择的row
const selectedRowKeys = ref([]);
// 展开行的key
const expandedRowKeys = ref([]);
// 展开行显示的具体内容
const expandedRow = (h, { row }) => (
  <div>
    <p>
      <b>职称：</b>
      <span>{row.jobTitle}</span>
    </p>
    <br />
    <p>
      <b>电话：</b>
      <span>{row.achievementContactPhone}</span>
    </p>
    <br />
    <p>
      <b>Email：</b>
      <span>{row.achievementContactEmail}</span>
    </p>
    <br />
    <p>
      <b>所在学院：</b>
      <span>{row.department}</span>
    </p>
    <br />
    <p>
      <b>技术成熟度：</b>
      <span>{row.technicalMaturity}</span>
    </p>
    <br />
    <p>
      <b>成果估值金额：</b>
      <span>{row.achievementPrice} 万元</span>
    </p>
    <br />
    <p>
      <b>转化方式：</b>
      <span>{row.transformWay}</span>
    </p>
  </div>
);
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
  initTableData();
});
// 初始化表格数据
const initTableData = () => {
  searchValue.value.currPage = 1;
  getFormData("/form/getFormPageByCondition");
};
// 获取表格数据
const getFormData = async (requestUrl) => {
  tableLoading.value = true;
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
    tableLoading.value = false;
  });
};
// 查询征集表
const searchForm = () => {
  const requestUrl = "/form/getFormPageByCondition";
  searchValue.value.currPage = 1;
  searchValue.value.size = 20;
  getFormData(requestUrl);
};
// 查看详情
const getFormInfo = (row) => {
  window.event.cancelBubble = true;
  router.push({
    path: "/dataCenter/detail",
    query: { id: row.id }
  });
};
// 修改
const editForm = (row) => {
  window.event.cancelBubble = true;
  router.push({
    path: "/dataCenter/edit",
    query: { id: row.id }
  });
};
// 删除
const deleteForm = (row) => {
  window.event.cancelBubble = true;
  let obj = { id: row.id };
  let requestUrl = setObjToUrlParams("/form/deleteForm", obj);
  request.post({
    url: requestUrl
  }).then(res => {
    console.log(res);
    MessagePlugin.success(res);
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    initTableData();
  });
};


/**
 * 表格操作钩子
 * @param val
 */
// 表格选择钩子
const rehandleSelectChange = (val) => {
  selectedRowKeys.value = val;
};
// 表格展开钩子
const rehandleExpandChange = (value, params) => {
  expandedRowKeys.value = value;
  console.log("rehandleExpandChange", value, params);
};
// 分页钩子
const rehandlePageChange = (curr) => {
  console.log("分页变化", curr);
  const requestUrl = "/form/getFormPageByCondition";
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
    //border: 1px solid red;
  }

  .searchInputStyle {
    width: 200px;
  }

  .searchBtnStyle {
    width: 80px;
  }
}
</style>
