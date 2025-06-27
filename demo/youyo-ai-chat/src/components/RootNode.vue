<template>
  <div class="root-node">
    <div class="node-header">
      <div class="root-icon">🚀</div>
      <div class="root-info">
        <span class="root-title">{{ data.title || '对话开始' }}</span>
        <span class="root-subtitle">{{ data.subtitle || 'AI 聊天流程' }}</span>
      </div>
    </div>
    
    <div class="node-description" v-if="data.description">
      {{ data.description }}
    </div>

    <!-- Vue Flow 连接点 - 只有底部输出 -->
    <Handle type="source" :position="Position.Bottom" class="handle-source" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';

interface RootNodeData {
  title?: string;
  subtitle?: string;
  description?: string;
}

interface Props {
  data: RootNodeData;
}

defineProps<Props>();
</script>

<style lang="less" scoped>
.root-node {
  min-width: 300px;
  max-width: 500px;
  min-height: 100px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
  border: 3px solid #ff5722;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(255, 87, 34, 0.4);
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .node-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;

    .root-icon {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .root-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .root-title {
        font-size: 18px;
        font-weight: 700;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .root-subtitle {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
      }
    }
  }

  .node-description {
    color: white;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .handle-source {
    width: 16px;
    height: 16px;
    background: #ff5722;
    border: 3px solid white;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 8px rgba(255, 87, 34, 0.5);
  }

  &:hover {
    box-shadow: 0 12px 32px rgba(255, 87, 34, 0.5);
    transform: translateY(-3px);
    transition: all 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #ff6b6b, #ffa726, #ff6b6b);
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.7;
  }
}

// Vue Flow 节点样式覆盖
:deep(.vue-flow__node) {
  background: transparent;
  border: none;
  padding: 0;
}
</style> 