<template>
  <div class="youyo-flow">
    <youyo-node :node="node" />
    <end-node />
  </div>
</template>

<script setup lang="ts">
import YouyoNode from './node.vue';
import EndNode from './endNode.vue';
import { ref } from 'vue';

const node = ref({
  title: 'xxx',
  text: 'xxxx',
  icon: 'xx',
  type: 'xx',
  child: {
    title: 'xxx',
    text: 'xxxx',
    icon: 'xx',
    type: 'condition',
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
