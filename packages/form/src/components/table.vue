<template>
  <a-table :data-source="value" :columns="columns" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface TableProps {
  id: string;
  value: Array<Record<string, any>>;
  columns: Array<Record<string, any>>;
}

defineProps<TableProps>();
</script>

<style scoped></style>
