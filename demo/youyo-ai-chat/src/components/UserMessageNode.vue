<template>
  <div class="user-message-node">
    <div class="node-header">
      <div class="user-avatar">👤</div>
      <div class="user-info">
        <span class="user-name">用户</span>
        <span class="timestamp">{{ formatTime(data.timestamp) }}</span>
      </div>
    </div>
    
    <div class="message-content">
      {{ data.message }}
    </div>

    <!-- Vue Flow 连接点 - 上下连接 -->
    <Handle type="target" :position="Position.Top" class="handle-target" />
    <Handle type="source" :position="Position.Bottom" class="handle-source" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';

interface UserMessageData {
  message: string;
  timestamp: Date;
}

interface Props {
  data: UserMessageData;
}

defineProps<Props>();

// 格式化时间
const formatTime = (timestamp: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(timestamp);
};
</script>

<style lang="less" scoped>
.user-message-node {
  min-width: 300px;
  max-width: 500px;
  min-height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #5a67d8;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(90, 103, 216, 0.3);
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .node-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .user-avatar {
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

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .user-name {
        font-size: 14px;
        font-weight: 600;
        color: white;
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
  }

  .handle-target {
    width: 12px;
    height: 12px;
    background: #4c51bf;
    border: 2px solid white;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
  }

  .handle-source {
    width: 12px;
    height: 12px;
    background: #4c51bf;
    border: 2px solid white;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover {
    box-shadow: 0 6px 20px rgba(90, 103, 216, 0.4);
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