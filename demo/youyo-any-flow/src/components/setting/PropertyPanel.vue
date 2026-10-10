<script setup lang="ts">
import { computed } from 'vue'
import { Settings2 } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import type { WorkflowNode } from '../../types/workflow'
import { NodeType, NODE_TYPE_META } from '../../types/workflow'

const { t } = useI18n()

const props = defineProps<{ selectedNode: WorkflowNode | null | undefined }>()

const nodeLabelMap: Record<string, string> = {
  start: 'start', end: 'end', variable: 'variable', llm: 'llm',
  knowledge: 'knowledge', condition: 'condition', loop: 'loop',
  http: 'httpRequest', code: 'code',
}

const nodeTypeLabel = computed(() => {
  if (!props.selectedNode) return ''
  const meta = NODE_TYPE_META.find((m) => m.type === props.selectedNode?.data.nodeType)
  if (!meta) return t('propertyPanel.unknown')
  return t(`nodeType.${nodeLabelMap[meta.type] || meta.type}`)
})

const nodeColor = computed(() => {
  if (!props.selectedNode) return '#94A3B8'
  const meta = NODE_TYPE_META.find((m) => m.type === props.selectedNode?.data.nodeType)
  return meta?.color || '#94A3B8'
})
</script>

<template>
  <aside class="property-panel">
    <div v-if="!selectedNode" class="panel-empty">
      <Settings2 :size="32" class="empty-icon" />
      <span class="empty-title">{{ t('propertyPanel.title') }}</span>
      <span class="empty-desc">{{ t('propertyPanel.emptyDesc') }}</span>
    </div>

    <template v-else>
      <div class="panel-header">
        <div class="header-dot" :style="{ background: nodeColor }"></div>
        <span class="header-title">{{ nodeTypeLabel }}</span>
      </div>

      <div class="panel-body">
        <!-- Basic Info -->
        <div class="setting-section">
          <div class="section-title">{{ t('propertyPanel.basicInfo') }}</div>
          <div class="form-group">
            <label class="form-label">{{ t('propertyPanel.name') }}</label>
            <input class="form-input" :value="selectedNode.data.label" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">{{ t('propertyPanel.description') }}</label>
            <textarea class="form-textarea" :value="selectedNode.data.description || ''" readonly rows="2" :placeholder="t('propertyPanel.addDescription')" />
          </div>
        </div>

        <!-- LLM Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.LLM" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.modelConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.provider') }}</label><select class="form-select" disabled><option>OpenAI</option></select></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.model') }}</label><select class="form-select" disabled><option>gpt-4</option></select></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.temperature') }}</label><input class="form-input" value="0.7" readonly /></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.systemPrompt') }}</label><textarea class="form-textarea" rows="3" readonly :placeholder="t('propertyPanel.enterSystemPrompt')" /></div>
        </div>

        <!-- HTTP Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.HTTP" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.requestConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.method') }}</label><select class="form-select" disabled><option>GET</option><option>POST</option></select></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.url') }}</label><input class="form-input" placeholder="https://..." readonly /></div>
        </div>

        <!-- Code Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.CODE" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.codeConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.language') }}</label><select class="form-select" disabled><option>JavaScript</option><option>Python</option></select></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.code') }}</label><textarea class="form-textarea code-area" rows="6" readonly :placeholder="t('propertyPanel.writeCode')" /></div>
        </div>

        <!-- Condition Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.CONDITION" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.conditionConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.variable') }}</label><input class="form-input" :placeholder="t('propertyPanel.selectVariable')" readonly /></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.operator') }}</label><select class="form-select" disabled><option>{{ t('propertyPanel.equals') }}</option><option>{{ t('propertyPanel.notEquals') }}</option><option>{{ t('propertyPanel.contains') }}</option></select></div>
        </div>

        <!-- Loop Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.LOOP" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.loopConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.type') }}</label><select class="form-select" disabled><option>{{ t('propertyPanel.iterateArray') }}</option><option>{{ t('propertyPanel.fixedCount') }}</option></select></div>
        </div>

        <!-- Knowledge Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.KNOWLEDGE" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.retrievalConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.knowledgeBase') }}</label><select class="form-select" disabled><option>{{ t('propertyPanel.selectKnowledgeBase') }}</option></select></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.topK') }}</label><input class="form-input" value="3" readonly /></div>
        </div>

        <!-- Variable Config -->
        <div v-if="selectedNode.data.nodeType === NodeType.VARIABLE" class="setting-section">
          <div class="section-title">{{ t('propertyPanel.variableConfig') }}</div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.name') }}</label><input class="form-input" :placeholder="t('propertyPanel.variableName')" readonly /></div>
          <div class="form-group"><label class="form-label">{{ t('propertyPanel.type') }}</label><select class="form-select" disabled><option>{{ t('propertyPanel.string') }}</option><option>{{ t('propertyPanel.number') }}</option><option>{{ t('propertyPanel.boolean') }}</option></select></div>
        </div>

        <!-- Node Info -->
        <div class="setting-section">
          <div class="section-title">{{ t('propertyPanel.nodeInfo') }}</div>
          <div class="info-row"><span class="info-label">{{ t('propertyPanel.id') }}</span><span class="info-value">{{ selectedNode.id }}</span></div>
          <div class="info-row"><span class="info-label">{{ t('propertyPanel.nodeType') }}</span><span class="info-value">{{ selectedNode.data.nodeType }}</span></div>
          <div class="info-row"><span class="info-label">{{ t('propertyPanel.position') }}</span><span class="info-value">({{ Math.round(selectedNode.position.x) }}, {{ Math.round(selectedNode.position.y) }})</span></div>
        </div>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.property-panel {
  width: var(--panel-width-right);
  height: 100%;
  background: var(--panel-bg);
  border-left: 1px solid var(--panel-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}

.panel-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
  padding: 24px;
}

.empty-icon { color: var(--text-muted); opacity: 0.4; }
.empty-title { font-size: 14px; font-weight: 600; color: var(--text-secondary); }
.empty-desc { font-size: 12px; color: var(--text-muted); text-align: center; }

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--panel-border);
  flex-shrink: 0;
}

.header-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.header-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }

.panel-body { flex: 1; overflow-y: auto; padding: 12px 16px; }

.setting-section { margin-bottom: 20px; }

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.form-group { margin-bottom: 10px; }

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-primary);
  background: #F9FAFB;
  outline: none;
  font-family: inherit;
  resize: vertical;
}

.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #3B82F6; background: #FFFFFF; }
.form-textarea { min-height: 60px; }

.code-area {
  font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
  font-size: 11px;
  background: #1F2937;
  color: #E5E7EB;
  border-color: #374151;
}

.info-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
.info-label { font-size: 11px; color: var(--text-muted); }
.info-value {
  font-size: 11px;
  color: var(--text-secondary);
  font-family: 'SF Mono', 'Fira Code', monospace;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
