<template>
  <div class="database-table-container">
    <!-- 表头 -->
    <div class="table-header">
      <div class="table-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm0-3H9V6h10v2z"/>
        </svg>
      </div>
      <div class="table-name">{{ data.tableName }}</div>
      <div class="table-actions">
        <button @click="toggleExpanded" class="expand-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" 
               :style="{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 字段容器 - 为嵌套的字段节点预留空间 -->
    <div v-if="expanded" class="fields-container">
      <!-- 字段节点将通过 Vue Flow 的嵌套机制自动渲染在这个容器内 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      tableName: 'users'
    })
  },
  id: String
});

const expanded = ref(true);

function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>

<style lang="less" scoped>
.database-table-container {
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  min-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  }

  .table-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 6px 6px 0 0;
    min-height: 40px;

    .table-icon {
      margin-right: 8px;
      display: flex;
      align-items: center;
    }

    .table-name {
      flex: 1;
      font-weight: 600;
      font-size: 14px;
    }

    .table-actions {
      .expand-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transition: all 0.2s;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        svg {
          transition: transform 0.2s;
        }
      }
    }
  }

  .fields-container {
    padding: 8px;
    min-height: 200px; // 为字段节点预留足够空间
    position: relative;
  }
}
</style> 