<template>
  <a-table :data-source="value" :columns="tableColumns" :pagination="pagination" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface TableProps {
  id: string;
  value: Array<Record<string, any>>;
  columns: Array<Record<string, any>>;
  pagination: false | { pageSize: number };
}

const props = defineProps<TableProps>();

const tableColumns = computed(() =>
  props.columns.map(c => ({ title: c.title, dataIndex: c.prop, width: c.width, align: c.align ?? 'left' })),
);
const pagination = computed(() => props.pagination);
</script>

<style scoped></style>
