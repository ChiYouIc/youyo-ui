<script setup lang="ts">
import type { NodeTypeMeta } from '../../types/workflow'
import * as LucideIcons from '@lucide/vue'
import { computed } from 'vue'

const props = defineProps<{ node: NodeTypeMeta }>()

const emit = defineEmits<{
  (e: 'drag-start', nodeType: string, event: DragEvent): void
}>()

const IconComponent = computed(() => {
  const iconMap: Record<string, string> = {
    play: 'Play', square: 'Square', variable: 'Variable', bot: 'Bot',
    library: 'Library', 'git-branch': 'GitBranch', repeat: 'Repeat',
    globe: 'Globe', code: 'Code', wrench: 'Wrench', sparkles: 'Sparkles',
    'layout-dashboard': 'LayoutDashboard',
  }
  const name = iconMap[props.node.icon] || 'Box'
  return (LucideIcons as Record<string, any>)[name] || LucideIcons.Box
})

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/node-type', props.node.type)
    event.dataTransfer.effectAllowed = 'move'
  }
  emit('drag-start', props.node.type, event)
}
</script>

<template>
  <div class="node-panel-item" draggable="true" @dragstart="onDragStart">
    <div class="node-item-icon" :style="{ background: node.color + '18', color: node.color }">
      <component :is="IconComponent" :size="16" />
    </div>
    <div class="node-item-info">
      <span class="node-item-label">{{ node.label }}</span>
      <span class="node-item-desc">{{ node.description }}</span>
    </div>
  </div>
</template>

<style scoped>
.node-panel-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: grab;
  transition: background var(--transition-fast), box-shadow var(--transition-fast);
  user-select: none;
}

.node-panel-item:hover { background: #F3F4F6; }
.node-panel-item:active { cursor: grabbing; box-shadow: var(--node-shadow); }

.node-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
}

.node-item-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.node-item-label { font-size: 13px; font-weight: 500; color: var(--text-primary); }
.node-item-desc {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
