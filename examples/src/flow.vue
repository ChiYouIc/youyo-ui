<template>
  <div class="youyo-flow">
    <youyo-node :node="node" />
  </div>
</template>

<script setup lang="ts">
import YouyoNode from '../../packages/flow/src/node/index.vue';
import { ref } from 'vue';
import { NodeMode, NodeType } from '../../packages/flow/src/types.ts';

const node = ref<NodeType>({
  title: '流程开始',
  text: '开始节点',
  icon: 'xx',
  type: NodeMode.START,
  next: {
    type: NodeMode.GROUP,
    groupList: [
      { title: '条件1', type: NodeMode.CONDITION },
      { title: '条件2', type: NodeMode.CONDITION },
      { title: '条件3', type: NodeMode.CONDITION },
    ],
    next: {
      title: '流程结束',
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
