<template>
  <div class="y-form-fence-item" v-for="(_, ri) in row">
    <template v-for="(_, ci) in col">
      <y-form-item v-if="comList[ ri * col + ci].length > 0" :component="comList[ ri * row + ci][0]"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import Fence from "../core/entity/Fence";
import YFormItem from './formItem.vue';

interface FenceProps {
  fence: Fence
}

const props = defineProps<FenceProps>();
const comList = computed(() => props.fence.list)
const row = computed(() => props.fence.row)
const col = computed(() => props.fence.col)

</script>

<style scoped lang="less">
.y-form-fence-item {
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }
}
</style>