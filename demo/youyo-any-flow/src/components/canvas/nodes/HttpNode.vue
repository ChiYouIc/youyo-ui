<script setup lang="ts">
import { Globe } from '@lucide/vue'
import BaseNode from './BaseNode.vue'
import type { WorkflowNodeData } from '../../../types/workflow'

defineProps<{
  id: string
  data: WorkflowNodeData
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', nodeId: string): void
}>()
</script>

<template>
  <BaseNode :id="id" :data="data" :selected="selected" :icon="Globe" @delete="emit('delete', $event)" />
</template>
