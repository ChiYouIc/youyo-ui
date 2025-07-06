<template>
  <div class="database-field-node">
    <!-- 左侧连接点 (Target) -->
    <Handle 
      :id="`${data.fieldName}-target`"
      type="target" 
      :position="Position.Left" 
      class="field-handle target-handle"
    />
    
    <div class="field-content">
      <div class="field-info">
        <div class="field-name">{{ data.fieldName }}</div>
        <div class="field-type">{{ data.fieldType }}</div>
      </div>
      
      <div class="field-constraints">
        <span v-if="data.isPrimaryKey" class="constraint pk" title="主键">PK</span>
        <span v-if="data.isForeignKey" class="constraint fk" title="外键">FK</span>
        <span v-if="data.isNotNull" class="constraint nn" title="非空">NN</span>
        <span v-if="data.isUnique" class="constraint uq" title="唯一">UQ</span>
      </div>
    </div>
    
    <!-- 右侧连接点 (Source) -->
    <Handle 
      :id="`${data.fieldName}-source`"
      type="source" 
      :position="Position.Right" 
      class="field-handle source-handle"
    />
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      fieldName: 'id',
      fieldType: 'INT',
      isPrimaryKey: false,
      isForeignKey: false,
      isNotNull: false,
      isUnique: false,
      tableName: ''
    })
  },
  id: String
});
</script>

<style lang="less" scoped>
.database-field-node {
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  min-height: 32px;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    border-color: #1890ff;
    
    .field-handle {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .field-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 8px;

    .field-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

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

  .field-handle {
    width: 8px;
    height: 8px;
    border: 2px solid #1890ff;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s;
    opacity: 0.7;
    z-index: 10;

    &.source-handle {
      right: -6px;
    }

    &.target-handle {
      left: -6px;
    }

    &:hover {
      background: #1890ff;
      transform: translateY(-50%) scale(1.4);
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.4);
      opacity: 1;
    }
  }
}

// Vue Flow 连接点样式覆盖
:deep(.vue-flow__handle) {
  opacity: 0.7;
  transition: all 0.2s;
}

:deep(.vue-flow__handle:hover) {
  opacity: 1 !important;
}
</style> 