<template>
  <div class="flow">
    <div class="json">
      <vue-json-pretty :showIcon="true" :data="node" />
    </div>
    <div class="view">
      <y-flow-view :node="node" />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue-json-pretty/lib/styles.css';

// import YFlowView, { NodeMode, NodeType } from 'youyo-flow';

import YFlowView from '../../packages/flow/src/flow/index.vue';
import { NodeMode, NodeType } from '../../packages/flow/src/types.ts';
import { ref, watchEffect } from 'vue';
import VueJsonPretty from 'vue-json-pretty';

const node = ref<NodeType>({
  title: '流程开始',
  text: '开始节点',
  icon: 'xx',
  type: NodeMode.START,
  next: {
    title: '组节点',
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

watchEffect(() => console.log(node.value), { flush: 'post' });
</script>

<style scoped lang="less">
.flow {
  //width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;

  .json {
    flex: 1;
  }

  .view {
    flex: 3;
  }
  //justify-content: center;
  //align-items: center;
}
</style>
