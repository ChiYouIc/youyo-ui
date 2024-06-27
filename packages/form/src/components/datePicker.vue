<template>
  <a-date-picker :id="id" v-model:value="dateVal" :picker="picker" :placeholder="placeholder" :disabled="disabled" />
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { Dayjs } from 'dayjs';

interface DatePickerEmits {
  (event: 'update:value', val: string | Dayjs): void;
}

interface DatePickerProps {
  id: string;
  value: string | Dayjs;
  placeholder: string;
  disabled: boolean;
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
}

const props = defineProps<DatePickerProps>();
const emits = defineEmits<DatePickerEmits>();

const dateVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>

<style scoped></style>
