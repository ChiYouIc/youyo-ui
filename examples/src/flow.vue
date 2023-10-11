<template>
  <div class="youyo-flow">
    <youyo-node :node="node" />
  </div>
</template>

<script setup lang="ts">
import YouyoNode from '../../packages/flow/src/node/index.vue';
// import EndNode from './endNode.vue';
import { ref } from 'vue';
import { NodeMode, NodeType } from '../../packages/flow/src/types.ts';

const node = ref<NodeType>({
  title: 'xxx',
  text: 'xxxx',
  icon: 'xx',
  type: NodeMode.START,
  next: {
    type: NodeMode.GROUP,
    groupList: [
      { title: '1', type: NodeMode.CONDITION },
      { title: '2', type: NodeMode.CONDITION },
      { title: '3', type: NodeMode.CONDITION },
    ],
    next: {
      title: 'end',
      type: NodeMode.END,
    },
  },
});
</script>

<style scoped lang="less">
.youyo-flow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
