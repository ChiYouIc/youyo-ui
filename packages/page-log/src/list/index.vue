<template>
  <a-card :bordered="false" class="log-list mb10">
    <y-search-bar label-width="80">
      <y-search-bar-item label="traceId" name="traceId">
        <a-input v-model:value="queryParam.traceId" allow-clear placeholder="请输入traceId" />
      </y-search-bar-item>
      <y-search-bar-item label="操作类型" name="operation">
        <a-select v-model:value="queryParam.operation" allow-clear placeholder="请选择操作类型" style="width: 100%">
          <a-select-option value="SEARCH">SEARCH</a-select-option>
          <a-select-option value="INSERT">INSERT</a-select-option>
          <a-select-option value="UPDATE">UPDATE</a-select-option>
          <a-select-option value="DELETE">DELETE</a-select-option>
          <a-select-option value="IMPORT">IMPORT</a-select-option>
          <a-select-option value="EXPORT">EXPORT</a-select-option>
        </a-select>
      </y-search-bar-item>
      <y-search-bar-item label="操作状态" name="operationStatus">
        <a-select v-model:value="queryParam.operationStatus" allow-clear placeholder="请选择操作状态" style="width: 100%">
          <a-select-option value="SUCCESS">成功</a-select-option>
          <a-select-option value="ERROR">失败</a-select-option>
        </a-select>
      </y-search-bar-item>
      <y-search-bar-item label="操作时间" name="operationTime">
        <a-range-picker v-model:value="operationTimeScope" show-time style="width: 100%" @change="handleRangePickerChange" />
      </y-search-bar-item>
      <template #bt>
        <a-button type="primary" @click="handleQuery">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>
    </y-search-bar>
    <a-table :columns="tableColumns" :data-source="dataList" :loading="dataLoading" :pagination="pagination" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operationStatus'">
          <a-tag :color="record.operationStatus === 'SUCCESS' ? '#87d068' : '#f50'">{{ record.operationStatus === 'SUCCESS' ? '成功' : '失败' }}</a-tag>
        </template>
        <template v-else-if="column.key === 'throwable'">
          {{ record.throwable ? record.throwable : '-' }}
        </template>
        <template v-else-if="column.key === 'option'">
          <a type="link" @click="handleShowAuditLog(record)">审计日志</a>
        </template>
      </template>
    </a-table>
    <show-audit-log v-model:show="visible" :data="auditLogData" :title="title" />
  </a-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { TableColumnType } from 'ant-design-vue';
import ShowAuditLog from './showAuditLog.vue';
import type { Dayjs } from 'dayjs';
import LogApi, { AuditLog, OperationLog } from './logApi';

const tableColumns: TableColumnType[] = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 60,
    customRender: ({ index }) => `${index + 1}`,
  },
  {
    title: 'traceId',
    dataIndex: 'traceId',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: 'operatorName',
    key: 'operatorName',
  },
  {
    title: 'Remote Host',
    dataIndex: 'requestRemoteHost',
    key: 'requestRemoteHost',
    ellipsis: true,
  },
  {
    title: 'URI',
    dataIndex: 'requestUri',
    key: 'requestUri',
    ellipsis: true,
  },
  {
    title: 'Request Method',
    dataIndex: 'requestMethod',
    key: 'requestMethod',
  },
  {
    title: 'User Agent',
    dataIndex: 'userAgent',
    key: 'userAgent',
    ellipsis: true,
  },
  {
    title: '执行方法',
    dataIndex: 'method',
    ellipsis: true,
  },
  {
    title: '执行参数',
    dataIndex: 'params',
    ellipsis: true,
  },
  {
    title: '返回结果',
    dataIndex: 'result',
    ellipsis: true,
  },
  {
    title: '日志描述',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '操作类型',
    dataIndex: 'operation',
    ellipsis: true,
  },
  {
    title: '操作状态',
    key: 'operationStatus',
    dataIndex: 'operationStatus',
  },
  {
    title: '异常消息',
    key: 'throwable',
    dataIndex: 'throwable',
    ellipsis: true,
  },
  {
    title: '操作时间',
    dataIndex: 'operationTime',
    width: 200,
  },
  {
    title: '操作',
    key: 'option',
    width: 90,
  },
];
const queryParam = ref<OperationLog>({
  pageSize: 10,
  pageNum: 1,
  traceId: '',
  operation: '',
  operationStatus: '',
  operationStartTime: '',
  operationEndTime: '',
});
const dataList = ref<Array<OperationLog>>([]);
const dataLoading = ref<boolean>(false);
const visible = ref<boolean>(false);
const title = ref<string>('');
const total = ref<number>(0);

const auditLogData = ref<Array<AuditLog>>([]);
const operationTimeScope = ref<[Dayjs | undefined, Dayjs | undefined]>();

// 分页
const pagination = computed(() => ({
  total: total.value,
  current: queryParam.value.pageNum,
  pageSize: queryParam.value.pageSize,
}));

onMounted(() => {
  getPageList();
});

function getPageList() {
  dataLoading.value = true;
  LogApi.page(queryParam.value)
    .then(res => {
      dataList.value = res.data;
      total.value = res.total;
    })
    .finally(() => {
      dataLoading.value = false;
    });
}

function handleTableChange(pag: { pageSize: number; current: number; total: number }) {
  queryParam.value.pageNum = pag.current;
  queryParam.value.pageSize = pag.pageSize;
  getPageList();
}

function handleQuery() {
  queryParam.value.pageSize = 10;
  queryParam.value.pageNum = 1;
  getPageList();
}

function handleReset() {
  queryParam.value = {
    pageSize: 10,
    pageNum: 1,
    traceId: '',
    operation: '',
    operationStatus: '',
    operationStartTime: '',
    operationEndTime: '',
  };
  operationTimeScope.value = [undefined, undefined];
  getPageList();
}

function handleShowAuditLog(record: AuditLog) {
  LogApi.auditList(record.traceId).then(res => {
    auditLogData.value = res.data;
    visible.value = true;
    title.value = record.traceId;
  });
}

function handleRangePickerChange(date: [Dayjs, Dayjs], dateString: [string, string]) {
  queryParam.value.operationStartTime = dateString[0];
  queryParam.value.operationEndTime = dateString[1];
}
</script>

<style scoped></style>
