<template>
  <div class="add-node-button-box">
    <a-button shape="circle" @click="onAdd(node)">
      <template #icon>
        <PlusOutlined style="color: #cacaca" />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts" name="y-flow-add-node-button">
import './style/addNodeButton.less';
import { PlusOutlined } from '@ant-design/icons-vue';
import { NodeMode, NodeType } from '../types';

const props = defineProps<{ node: NodeType }>();

function onAdd(node: NodeType) {
  node.next = {
    title: '1111',
    icon: 'xxxxx',
    text: 'xxxxxxxxxx',
    type: NodeMode.NODE,
    next: props.node.next,
  };
}
</script>

<style scoped lang="less"></style>
