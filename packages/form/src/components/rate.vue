<template>
  <a-rate :id="id" v-model:value="rateVal" :disabled="disabled" :count="count" :allow-half="allowHalf"></a-rate>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface RateEmits {
  (event: 'update:value', val: number): void;
}

interface RateProps {
  id: string;
  value: number;
  disabled: boolean;
  count: number;
  allowHalf: boolean;
}

const props = defineProps<RateProps>();
const emits = defineEmits<RateEmits>();

const rateVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>

<style scoped></style>
