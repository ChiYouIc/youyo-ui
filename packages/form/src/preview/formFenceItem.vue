<template>
  <div class="y-form-fence-item" :style="gridStyle">
    <div v-for="(cell, index) in cells" :key="index" class="y-form-fence-cell">
      <y-form-item v-if="cell?.[0]" :component="cell[0]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/formFenceItem.less';
import { computed, defineProps } from 'vue';
import type { CSSProperties } from 'vue';
import type { FenceModel } from '../core';
import YFormItem from './formItem.vue';

interface FenceProps {
  fence: FenceModel;
}

const props = defineProps<FenceProps>();
const cells = computed(() => props.fence.list.slice(0, props.fence.row * props.fence.col));
const gridStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${props.fence.col}, minmax(0, 1fr))`,
}));
</script>
