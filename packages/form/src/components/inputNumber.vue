<template>
  <a-input-number :id="id" v-model:value="inputNumberVal" :disabled="disabled" :placeholder="placeholder" :min="min" :max="max" :step="step" :precision="precision"></a-input-number>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface InputNumberEmits {
  (event: 'update:value', val: string | number): void;
}

interface InputNumberProps {
  id: string;
  value: string | number;
  placeholder: string;
  disabled: boolean;
  min: number;
  max: number;
  step: number;
  precision?: number;
}

const props = defineProps<InputNumberProps>();
const emits = defineEmits<InputNumberEmits>();

const inputNumberVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>
<style scoped></style>
