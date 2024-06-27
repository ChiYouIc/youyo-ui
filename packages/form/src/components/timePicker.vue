<template>
  <a-time-picker :id="id" v-model:value="timePickerVal" :disabled="disabled" :placeholder="placeholder" :hour-step="hourStep" :minute-step="minuteStep" :second-step="secondStep"></a-time-picker>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface TimePickerEmits {
  (event: 'update:value', val: string): void;
}

interface TimePickerProps {
  id: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
}

const props = defineProps<TimePickerProps>();
const emits = defineEmits<TimePickerEmits>();

const timePickerVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>
<style scoped></style>
