<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'
import type { NodeCategoryMeta, NodeTypeMeta } from '../../types/workflow'
import NodePanelItem from './NodePanelItem.vue'

const props = defineProps<{
  category: NodeCategoryMeta
  nodes: NodeTypeMeta[]
}>()

const emit = defineEmits<{
  (e: 'drag-start', nodeType: string, event: DragEvent): void
}>()

const expanded = ref(props.category.expanded)

function toggle() {
  expanded.value = !expanded.value
}

function onDragStart(nodeType: string, event: DragEvent) {
  emit('drag-start', nodeType, event)
}
</script>

<template>
  <div class="node-category">
    <button class="category-header" @click="toggle">
      <div class="category-label">
        <span class="category-title">{{ category.label }}</span>
        <span class="category-count">{{ nodes.length }}</span>
      </div>
      <ChevronDown
        :size="14"
        class="category-chevron"
        :class="{ collapsed: !expanded }"
      />
    </button>

    <div v-if="expanded" class="category-items">
      <NodePanelItem
        v-for="node in nodes"
        :key="node.type"
        :node="node"
        @drag-start="onDragStart"
      />
    </div>
  </div>
</template>

<style scoped>
.node-category {
  margin-bottom: 2px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  transition: background var(--transition-fast);
}

.category-header:hover {
  background: #F3F4F6;
}

.category-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-count {
  font-size: 10px;
  color: var(--text-muted);
  background: #F3F4F6;
  padding: 1px 6px;
  border-radius: 10px;
}

.category-chevron {
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.category-chevron.collapsed {
  transform: rotate(-90deg);
}

.category-items {
  padding: 2px 0;
}
</style>
