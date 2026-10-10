<template>
  <div class="y-form-fence-item" v-for="(_, ri) in row" :key="ri">
    <template v-for="(_, ci) in col" :key="ci">
      <y-form-item v-if="comList[ri * col + ci] && comList[ri * col + ci].length > 0" :component="comList[ri * col + ci][0]"> </y-form-item>
      <div v-else>-</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import './style/formFenceItem.less';
import { computed, defineProps } from 'vue';
import type { FenceModel } from '../core';
import YFormItem from './formItem.vue';

interface FenceProps {
  fence: FenceModel;
}

const props = defineProps<FenceProps>();
const comList = computed(() => props.fence.list);
const row = computed(() => props.fence.row);
const col = computed(() => props.fence.col);
</script>
