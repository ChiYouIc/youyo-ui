<template>
  <div class="database-table-node">
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

    <!-- 字段列表 -->
    <div v-if="expanded" class="fields-container">
      <div v-for="field in data.fields" :key="field.name" class="field-row">
        <!-- 左侧连接点 (Target) -->
        <Handle 
          :id="`${field.name}-target`"
          type="target" 
          :position="Position.Left" 
          class="field-handle target-handle"
          :style="{ top: '50%', transform: 'translateY(-50%)' }"
        />
        
        <div class="field-info">
          <div class="field-name">{{ field.name }}</div>
          <div class="field-type">{{ field.type }}</div>
        </div>
        
        <div class="field-constraints">
          <span v-if="field.isPrimaryKey" class="constraint pk" title="主键">PK</span>
          <span v-if="field.isForeignKey" class="constraint fk" title="外键">FK</span>
          <span v-if="field.isNotNull" class="constraint nn" title="非空">NN</span>
          <span v-if="field.isUnique" class="constraint uq" title="唯一">UQ</span>
        </div>
        
        <!-- 右侧连接点 (Source) -->
        <Handle 
          :id="`${field.name}-source`"
          type="source" 
          :position="Position.Right" 
          class="field-handle source-handle"
          :style="{ top: '50%', transform: 'translateY(-50%)' }"
        />
      </div>
    </div>

    <!-- 表级别的连接点（当折叠时使用） -->
    <Handle v-if="!expanded" type="source" :position="Position.Right" class="table-handle" />
    <Handle v-if="!expanded" type="target" :position="Position.Left" class="table-handle" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      tableName: 'users',
      fields: [
        { name: 'id', type: 'INT', isPrimaryKey: true, isNotNull: true },
        { name: 'username', type: 'VARCHAR(50)', isNotNull: true, isUnique: true },
        { name: 'email', type: 'VARCHAR(100)', isNotNull: true },
        { name: 'created_at', type: 'TIMESTAMP', isNotNull: true },
        { name: 'updated_at', type: 'TIMESTAMP' }
      ]
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
.database-table-node {
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  min-width: 250px;
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
    .field-row {
      position: relative;
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border-bottom: 1px solid #f0f0f0;
      min-height: 32px;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #f8f9fa;
        
        .field-handle {
          transform: translateY(-50%) scale(1.2);
          background: #1890ff;
        }
      }

      .field-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin: 0 12px;

        .field-name {
          font-weight: 500;
          font-size: 13px;
          color: #262626;
        }

        .field-type {
          font-size: 11px;
          color: #8c8c8c;
          font-family: 'Monaco', 'Menlo', monospace;
        }
      }

      .field-constraints {
        display: flex;
        gap: 4px;
        margin-left: 8px;

        .constraint {
          font-size: 9px;
          padding: 2px 4px;
          border-radius: 2px;
          font-weight: 600;
          line-height: 1;

          &.pk {
            background: #ff4d4f;
            color: white;
          }

          &.fk {
            background: #faad14;
            color: white;
          }

          &.nn {
            background: #52c41a;
            color: white;
          }

          &.uq {
            background: #1890ff;
            color: white;
          }
        }
      }
    }
  }

  .field-handle {
    width: 10px;
    height: 10px;
    border: 2px solid #1890ff;
    background: white;
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s;
    z-index: 10;

    &.source-handle {
      right: -7px;
    }

    &.target-handle {
      left: -7px;
    }

    &:hover {
      background: #1890ff;
      transform: translateY(-50%) scale(1.3) !important;
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
    }
  }

  .table-handle {
    width: 12px;
    height: 12px;
    border: 2px solid #1890ff;
    background: white;
    border-radius: 50%;

    &:hover {
      background: #1890ff;
      transform: scale(1.1);
    }
  }
}

// Vue Flow 连接点样式覆盖 - 确保连接点始终可见
:deep(.vue-flow__handle) {
  opacity: 1 !important;
  transition: all 0.2s;
}

:deep(.vue-flow__node:hover .vue-flow__handle) {
  opacity: 1 !important;
}

// 连接线样式
:deep(.vue-flow__edge) {
  z-index: 5;
}

:deep(.vue-flow__edge.selected) {
  z-index: 15;
}
</style> 