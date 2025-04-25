<template>
  <a-drawer v-model:visible="visible" :title="title" class="show-audit-log" placement="right" width="50%">
    <a-timeline>
      <a-timeline-item v-if="data.length === 0">没有审计日志</a-timeline-item>
      <a-timeline-item v-for="item in data" v-else :key="item.id" :color="timeLineColorMap[item.level]">
        <a-row :gutter="[16, 16]">
          <a-col :span="2">traceId:</a-col>
          <a-col :span="22">{{ item.traceId }}</a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="2">审计内容:</a-col>
          <a-col :span="22">{{ item.auditContent }}</a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="2">审计级别:</a-col>
          <a-col :span="22">{{ item.level }}</a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="2">审计时间:</a-col>
          <a-col :span="22">{{ item.operationTime }}</a-col>
        </a-row>
      </a-timeline-item>
    </a-timeline>
  </a-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { AuditLog } from './logApi';

const timeLineColorMap = {
  INFO: 'green',
  WARN: 'orange',
  ERROR: 'red',
  DEBUG: 'gray',
};

interface Props {
  show?: boolean;
  title?: string;
  data: Array<AuditLog>;
}

interface Emits {
  (event: 'update:show', val: boolean): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const visible = computed<boolean>({
  get: () => props.show,
  set: newVal => emits('update:show', newVal),
});
</script>

<style scoped></style>
