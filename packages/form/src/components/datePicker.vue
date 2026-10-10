<template>
  <a-range-picker
    v-if="range"
    :id="id"
    v-model:value="rangeValue"
    :picker="picker"
    :format="format"
    :value-format="valueFormat"
    :placeholder="[placeholder, placeholder]"
    :disabled="disabled"
    :disabled-date="isDisabledDate"
  />
  <a-date-picker
    v-else
    :id="id"
    v-model:value="singleValue"
    :picker="picker"
    :format="format"
    :value-format="valueFormat"
    :placeholder="placeholder"
    :disabled="disabled"
    :disabled-date="isDisabledDate"
  />
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

interface DatePickerEmits {
  (event: 'update:value', val: string | Dayjs | Array<string | Dayjs>): void;
}

interface DatePickerProps {
  id: string;
  value: string | Dayjs | Array<string | Dayjs>;
  placeholder: string;
  disabled: boolean;
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
  format: string;
  valueFormat: string;
  range: boolean;
  minDate?: string;
  maxDate?: string;
}

const props = defineProps<DatePickerProps>();
const emits = defineEmits<DatePickerEmits>();

const singleValue = computed<string | Dayjs | undefined>({
  get: () => (Array.isArray(props.value) ? undefined : props.value),
  set: value => emits('update:value', value ?? ''),
});
const rangeValue = computed<Array<string | Dayjs> | undefined>({
  get: () => (Array.isArray(props.value) ? props.value : undefined),
  set: value => emits('update:value', value ?? []),
});

function isDisabledDate(date: Dayjs): boolean {
  return !!(
    (props.minDate && date.isBefore(dayjs(props.minDate), 'day')) ||
    (props.maxDate && date.isAfter(dayjs(props.maxDate), 'day'))
  );
}
</script>

<style scoped></style>
