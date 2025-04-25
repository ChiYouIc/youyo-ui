<template>
  <div class="vue-flow__node-default special-node">
    <div>{{ data.label }}</div>
    <div>{{ x }} {{ y }}</div>
    <a-button type="primary" @click="removeNodes(id)">删除节点</a-button>
    <a-button type="primary" @click="addNextNode">新增节点</a-button>
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Handle, Position, useVueFlow } from '@vue-flow/core';

const props = defineProps({
  position: {
    type: Object,
    required: true,
  },
  data: Object,
  id: String,
});

const x = computed(() => `${Math.round(props.position.x)}px`);
const y = computed(() => `${Math.round(props.position.y)}px`);

const { addNodes, addEdges, removeNodes } = useVueFlow();

function addNextNode() {
  const nextNodeId = Math.random().toString(36);
  const nextNode = {
    id: nextNodeId,
    type: 'source',
    position: {
      x: props.position.x + 200,
      y: props.position.y + 200,
    },
    data: {
      label: nextNodeId,
    },
  };

  addNodes(nextNode);
  addEdges({
    id: `${props.id} -> ${nextNodeId}`,
    source: props.id,
    target: nextNodeId,
    type: 'special',
    data: {
      hello: 'world',
    },
  });
}
</script>

<style lang="less" scoped>
.special-node {
  background: purple;
  color: white;
  border: 1px solid purple;
  border-radius: 4px;
  box-shadow: 0 0 0 1px purple;
  padding: 8px;
}
</style>
