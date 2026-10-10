<template>
  <a-time-range-picker
    v-if="range"
    :id="id"
    v-model:value="rangeValue"
    :disabled="disabled"
    :format="format"
    :value-format="valueFormat"
    :placeholder="[placeholder, placeholder]"
    :hour-step="hourStep"
    :minute-step="minuteStep"
    :second-step="secondStep"
  />
  <a-time-picker
    v-else
    :id="id"
    v-model:value="timePickerVal"
    :disabled="disabled"
    :placeholder="placeholder"
    :format="format"
    :value-format="valueFormat"
    :hour-step="hourStep"
    :minute-step="minuteStep"
    :second-step="secondStep"
  />
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface TimePickerEmits {
  (event: 'update:value', val: string | string[]): void;
}

interface TimePickerProps {
  id: string;
  value: string | string[];
  placeholder: string;
  disabled: boolean;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
  format: string;
  valueFormat: string;
  range: boolean;
}

const props = defineProps<TimePickerProps>();
const emits = defineEmits<TimePickerEmits>();

const timePickerVal = computed<string | undefined>({
  get: () => (Array.isArray(props.value) ? undefined : props.value),
  set: val => emits('update:value', val ?? ''),
});
const rangeValue = computed<string[] | undefined>({
  get: () => (Array.isArray(props.value) ? props.value : undefined),
  set: val => emits('update:value', val ?? []),
});
</script>
<style scoped></style>
