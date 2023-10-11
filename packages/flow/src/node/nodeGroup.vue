<template>
  <div class="node-group">
    <div class="node-group-node">
      <div class="add-condition-button-box">
        <button @click="addConditionNode(node)">添加条件</button>
      </div>
      <template v-for="(n, index) in node.groupList" :key="index">
        <y-flow-node v-if="index === 0" cover="left" :node="n" @remove="onRemove(node, index)" />
        <y-flow-node v-else-if="index === node.groupList.length - 1" cover="right" :node="n" @remove="onRemove(node, index)" />
        <y-flow-node v-else :node="n" @remove="onRemove(node, index)" />
      </template>
    </div>
    <add-node-button :node="node" />
    <template v-if="node.next">
      <y-flow-node :node="node.next" />
    </template>
  </div>
</template>

<script setup lang="ts" name="y-flow-node-group">
import './style/nodeGroup.less';
import YFlowNode from './index.vue';
import AddNodeButton from './addNodeButton.vue';
import { NodeMode, NodeType } from '../types.ts';

defineProps<{ node: NodeType }>();

function onRemove(node: NodeType, index: number) {
  node.groupList?.splice(index, 1);
}

/**
 * 添加条件
 */
function addConditionNode(node: NodeType) {
  node.groupList?.push({
    title: 'xxx',
    icon: 'xxx',
    text: 'xxxx',
    type: NodeMode.CONDITION,
  });
}
</script>
