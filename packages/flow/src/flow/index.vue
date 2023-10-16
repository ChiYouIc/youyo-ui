<template>
  <div class="youyo-flow">
    <div class="flow-options">
      <div>
        <div class="title">
          <span>Title</span>
          <div class="splitter"></div>
        </div>
        <div class="action">Action</div>
        <div class="transform">
          <minus-icon @click="onZoomOut" />
          <span>{{ Number(scale * 100).toFixed(0) }}%</span>
          <plus-icon @click="onZoomIn" />
        </div>
      </div>
    </div>
    <div>
      <div class="flow-view" :style="{ transform: `scale(${scale})` }">
        <y-flow-node :node="node" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="y-flow-view">
import './style/index.less';
import YFlowNode from '../node/index.vue';
import { NodeType } from '../types';
import { ref } from 'vue';
import { MinusIcon, PlusIcon } from '../icon/index';

defineProps<{ node: NodeType }>();
const scale = ref<number>(1);

function onZoomIn() {
  if (scale.value >= 1.5) {
    return;
  }
  scale.value += 0.05;
}

function onZoomOut() {
  if (scale.value <= 0.25) {
    return;
  }
  scale.value -= 0.05;
}
</script>
