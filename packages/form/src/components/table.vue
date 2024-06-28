<template>
  <a-table :data-source="value" :columns="tableColumns" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface TableProps {
  id: string;
  value: Array<Record<string, any>>;
  columns: Array<Record<string, any>>;
}

const props = defineProps<TableProps>();

const tableColumns = computed(() => props.columns.map(c => ({ title: c.title, dataIndex: c.prop })));
</script>

<style scoped></style>
