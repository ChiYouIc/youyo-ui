<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { NODE_CATEGORY_META, NODE_TYPE_META, type NodeTypeMeta } from '../../types/workflow'
import NodePanelCategory from './NodePanelCategory.vue'

const { t, locale } = useI18n()

const emit = defineEmits<{
  (e: 'drag-start', nodeType: string, event: DragEvent): void
}>()

const searchQuery = ref('')

const nodeLabelMap: Record<string, string> = {
  start: 'start', end: 'end', variable: 'variable', llm: 'llm',
  knowledge: 'knowledge', condition: 'condition', loop: 'loop',
  http: 'httpRequest', code: 'code',
}

const nodeDescMap: Record<string, string> = {
  start: 'start', end: 'end', variable: 'variable', llm: 'llm',
  knowledge: 'knowledge', condition: 'condition', loop: 'loop',
  http: 'httpRequest', code: 'code',
}

const categoryLabelMap: Record<string, string> = {
  basic: 'basic', ai: 'ai', logic: 'logic', tool: 'tools',
}

// 生成本地化的节点元数据
const localizedNodeTypeMeta = computed(() => {
  return NODE_TYPE_META.map((n) => ({
    ...n,
    label: t(`nodeType.${nodeLabelMap[n.type] || n.type}`),
    description: t(`nodeDesc.${nodeDescMap[n.type] || n.type}`),
  }))
})

const localizedCategoryMeta = computed(() => {
  return NODE_CATEGORY_META.map((cat) => ({
    ...cat,
    label: t(`nodeCategory.${categoryLabelMap[cat.key] || cat.key}`),
  }))
})

const filteredNodesByCategory = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const result: Record<string, NodeTypeMeta[]> = {}
  for (const cat of localizedCategoryMeta.value) {
    const nodes = localizedNodeTypeMeta.value.filter(
      (n) => n.category === cat.key && (!query || n.label.toLowerCase().includes(query) || n.description.toLowerCase().includes(query))
    )
    if (nodes.length > 0) result[cat.key] = nodes
  }
  return result
})

function onDragStart(nodeType: string, event: DragEvent) {
  emit('drag-start', nodeType, event)
}
</script>

<template>
  <aside class="node-panel">
    <div class="panel-header">
      <span class="panel-title">{{ t('nodePanel.title') }}</span>
    </div>
    <div class="panel-search">
      <Search :size="14" class="search-icon" />
      <input v-model="searchQuery" class="search-input" :placeholder="t('nodePanel.search')" />
    </div>
    <div class="panel-body">
      <NodePanelCategory
        v-for="cat in localizedCategoryMeta"
        :key="cat.key"
        :category="cat"
        :nodes="filteredNodesByCategory[cat.key] || []"
        @drag-start="onDragStart"
      />
    </div>
  </aside>
</template>

<style scoped>
.node-panel {
  width: var(--panel-width-left);
  height: 100%;
  background: var(--panel-bg);
  border-right: 1px solid var(--panel-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}

.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px 8px; flex-shrink: 0; }
.panel-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }

.panel-search { position: relative; margin: 0 12px 8px; flex-shrink: 0; }

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 32px;
  padding: 0 12px 0 30px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-primary);
  background: #F9FAFB;
  outline: none;
  transition: border-color var(--transition-fast);
}

.search-input:focus { border-color: #3B82F6; background: #FFFFFF; }
.search-input::placeholder { color: var(--text-muted); }

.panel-body { flex: 1; overflow-y: auto; padding: 0 8px 12px; }
</style>
