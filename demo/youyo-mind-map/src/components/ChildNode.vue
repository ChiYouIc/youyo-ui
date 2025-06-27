<template>
  <div class="child-node" :style="{ backgroundColor: data.color || '#4285f4' }">
    <!-- 左侧连接点 -->
    <Handle type="target" :position="Position.Left" class="node-handle left-handle" />
    <!-- 右侧连接点 -->
    <Handle type="source" :position="Position.Right" class="node-handle right-handle" />

    <div class="child-icon">•</div>
    <span class="child-text">{{ data.label }} ({{ data.childCount || 0 }})</span>

    <!-- 添加按钮 -->
    <button class="add-button" @click="handleAddChild" title="添加子节点">+</button>
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';

// 定义节点数据类型
interface NodeData {
  label: string;
  color?: string;

  [key: string]: any;
}

// 定义 props 和 emits
const props = defineProps<{
  data: NodeData;
  nodeId: string;
}>();

const emit = defineEmits<{
  addChild: [nodeId: string];
}>();

// 处理添加子节点
function handleAddChild() {
  emit('addChild', props.nodeId);
}
</script>

<style scoped lang="less">
/* 子节点样式 */
.child-node {
  color: white;
  padding: 8px 0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: none;
  min-width: 200px;
  min-height: 50px;
  max-width: 300px;
  white-space: nowrap;
  position: relative;
  font-weight: 500;
  transition: all 0.2s ease;
}

.child-icon {
  color: rgba(255, 255, 255, 0.9);
  font-size: 10px;
  flex-shrink: 0;
}

.child-text {
  font-size: 13px;
  font-weight: 500;
}

.add-button {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

/* 连接点样式 */
:deep(.node-handle) {
  width: 8px;
  height: 8px;
  background: #1890ff;
  border: 2px solid #fff;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.2s ease;
}

:deep(.child-node:hover .node-handle) {
  opacity: 1;
}

:deep(.node-handle:hover) {
  background: #40a9ff;
  transform: scale(1.3);
}

:deep(.left-handle) {
  //left: -6px;
}

:deep(.right-handle) {
  //right: -6px;
}
</style>
