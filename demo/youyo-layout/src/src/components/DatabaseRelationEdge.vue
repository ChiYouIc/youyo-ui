<template>
  <!-- 使用 BaseEdge 组件创建自定义边 -->
  <BaseEdge :path="path[0]" :style="edgeStyle" :marker-end="markerEnd" />

  <!-- 使用 EdgeLabelRenderer 在边上显示关系标签 -->
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="relation-label nodrag nopan"
    >
      <div class="relation-badge">
        <div class="relation-type">{{ data.relationType || '1:N' }}</div>
        <div v-if="data.sourceField && data.targetField" class="field-connection">
          {{ data.sourceField }} → {{ data.targetField }}
        </div>
      </div>
    </div>
  </EdgeLabelRenderer>
</template>

<script setup>
import { BaseEdge, EdgeLabelRenderer, getStraightPath } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps({
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

// 使用直线路径而不是贝塞尔曲线
const path = computed(() => getStraightPath(props));

const edgeStyle = computed(() => ({
  stroke: '#ff6b6b',
  strokeWidth: 2,
  ...props.style,
}));

const markerEnd = computed(() => ({
  type: 'smoothstep',
  color: '#ff6b6b',
}));
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.relation-label {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.relation-badge {
  background: #ff6b6b;
  color: white;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
  min-width: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.relation-type {
  font-weight: 700;
  font-size: 12px;
}

.field-connection {
  font-size: 10px;
  opacity: 0.9;
  font-weight: 500;
  white-space: nowrap;
}
</style> 