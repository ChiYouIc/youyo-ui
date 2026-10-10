<script setup lang="ts">
import { Play, Upload, Save, Undo2, Redo2, Settings, ChevronDown, Globe } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { getLocale, setLocale } from '../../locales'

const { t } = useI18n()

defineProps<{ workflowName: string }>()

const emit = defineEmits<{
  (e: 'run'): void
  (e: 'publish'): void
  (e: 'save'): void
  (e: 'undo'): void
  (e: 'redo'): void
}>()

function toggleLang() {
  const next = getLocale() === 'zh-CN' ? 'en-US' : 'zh-CN'
  setLocale(next)
}
</script>

<template>
  <header class="top-toolbar">
    <div class="toolbar-left">
      <div class="brand">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">YouYo Flow</span>
          <span class="brand-sep">/</span>
          <input class="workflow-name-input" :value="workflowName" readonly :title="t('toolbar.workflowName')" />
          <ChevronDown class="brand-chevron" :size="14" />
        </div>
      </div>
    </div>

    <div class="toolbar-center">
      <button class="toolbar-btn primary" @click="emit('run')">
        <Play :size="16" /><span>{{ t('toolbar.run') }}</span>
      </button>
      <button class="toolbar-btn" @click="emit('publish')">
        <Upload :size="16" /><span>{{ t('toolbar.publish') }}</span>
      </button>
      <div class="toolbar-divider"></div>
      <button class="toolbar-btn" @click="emit('save')">
        <Save :size="16" /><span>{{ t('toolbar.save') }}</span>
      </button>
      <button class="toolbar-btn" @click="emit('undo')"><Undo2 :size="16" /></button>
      <button class="toolbar-btn" @click="emit('redo')"><Redo2 :size="16" /></button>
    </div>

    <div class="toolbar-right">
      <button class="toolbar-btn lang-btn" @click="toggleLang" :title="t('lang.switch')">
        <Globe :size="16" />
        <span>{{ t('lang.switch') }}</span>
      </button>
      <button class="toolbar-btn"><Settings :size="16" /></button>
    </div>
  </header>
</template>

<style scoped>
.top-toolbar {
  height: var(--topbar-height);
  background: var(--topbar-bg);
  border-bottom: 1px solid var(--panel-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
  z-index: 100;
}

.toolbar-left { display: flex; align-items: center; min-width: calc(var(--panel-width-left) - 16px); }

.brand { display: flex; align-items: center; gap: 8px; }

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8B5CF6, #3B82F6);
  color: #fff;
}

.brand-text { display: flex; align-items: center; gap: 4px; font-size: 13px; }
.brand-title { font-weight: 700; color: var(--text-primary); }
.brand-sep { color: var(--text-muted); font-weight: 300; }

.workflow-name-input {
  border: none;
  background: transparent;
  font-size: 13px;
  color: var(--text-secondary);
  outline: none;
  width: 120px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
}

.workflow-name-input:hover { background: #F3F4F6; }
.workflow-name-input:focus { background: #F3F4F6; color: var(--text-primary); cursor: text; }
.brand-chevron { color: var(--text-muted); }

.toolbar-center { display: flex; align-items: center; gap: 4px; }

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.toolbar-btn:hover { background: #F3F4F6; color: var(--text-primary); }

.toolbar-btn.primary {
  background: #3B82F6;
  color: #FFFFFF;
  border-color: #3B82F6;
  font-weight: 500;
}

.toolbar-btn.primary:hover { background: #2563EB; border-color: #2563EB; }

.toolbar-divider { width: 1px; height: 20px; background: var(--panel-border); margin: 0 6px; }

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: calc(var(--panel-width-right) - 16px);
  justify-content: flex-end;
}
</style>
