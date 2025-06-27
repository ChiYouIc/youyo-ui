<template>
  <div class="llm-message-node">
    <div class="node-header">
      <div class="llm-avatar">🤖</div>
      <div class="llm-info">
        <span class="model-name">{{ data.modelName }}</span>
        <span class="timestamp">{{ formatTime(data.timestamp) }}</span>
      </div>
    </div>
    
    <div class="message-content">
      {{ data.message }}
    </div>

    <!-- 添加子节点按钮 -->
    <div class="node-actions">
      <button 
        @click="handleAddChild" 
        class="add-child-btn"
        title="添加用户回复"
      >
        ➕ 添加用户回复
      </button>
    </div>

    <!-- Vue Flow 连接点 - 上下连接 -->
    <Handle type="target" :position="Position.Top" class="handle-target" />
    <Handle type="source" :position="Position.Bottom" class="handle-source" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Handle, Position } from '@vue-flow/core';

interface LLMMessageData {
  message: string;
  modelName: string;
  timestamp: Date;
}

interface Props {
  id: string;
  data: LLMMessageData;
}

const props = defineProps<Props>();

// 注入添加子节点的方法
const addChildNodeFunc = inject<(parentId: string) => void>('addChildNode');

// 格式化时间
const formatTime = (timestamp: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(timestamp);
};

// 添加子节点处理函数
const handleAddChild = () => {
  if (addChildNodeFunc) {
    addChildNodeFunc(props.id);
  }
};
</script>

<style lang="less" scoped>
.llm-message-node {
  min-width: 300px;
  max-width: 500px;
  min-height: 80px;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  border: 2px solid #10b981;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .node-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .llm-avatar {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      backdrop-filter: blur(10px);
    }

    .llm-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .model-name {
        font-size: 14px;
        font-weight: 600;
        color: white;
        display: flex;
        align-items: center;
        gap: 4px;

        &::before {
          content: "🧠";
          font-size: 12px;
        }
      }

      .timestamp {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .message-content {
    color: white;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    margin-bottom: 12px;
  }

  .node-actions {
    display: flex;
    justify-content: center;
    margin-top: 8px;

    .add-child-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      color: white;
      padding: 6px 12px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .handle-target {
    width: 12px;
    height: 12px;
    background: #059669;
    border: 2px solid white;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
  }

  .handle-source {
    width: 12px;
    height: 12px;
    background: #059669;
    border: 2px solid white;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover {
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    transform: translateY(-2px);
    transition: all 0.2s ease;
  }
}

// Vue Flow 节点样式覆盖
:deep(.vue-flow__node) {
  background: transparent;
  border: none;
  padding: 0;
}
</style> 