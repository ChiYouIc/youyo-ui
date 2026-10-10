<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  nodeCount: number
  edgeCount: number
  zoom: number
}>()
</script>

<template>
  <footer class="bottom-statusbar">
    <div class="status-left">
      <span class="status-item">
        <span class="status-label">{{ t('statusBar.nodes') }}</span>
        <span class="status-value">{{ nodeCount }}</span>
      </span>
      <span class="status-item">
        <span class="status-label">{{ t('statusBar.edges') }}</span>
        <span class="status-value">{{ edgeCount }}</span>
      </span>
    </div>
    <div class="status-right">
      <span class="status-item">
        <span class="status-label">{{ t('statusBar.zoom') }}</span>
        <span class="status-value">{{ Math.round(zoom * 100) }}%</span>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.bottom-statusbar {
  height: var(--statusbar-height);
  background: var(--statusbar-bg);
  border-top: 1px solid var(--panel-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
  font-size: 11px;
  color: var(--text-muted);
  z-index: 100;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-label {
  color: var(--text-muted);
}

.status-value {
  color: var(--text-secondary);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
</style>
