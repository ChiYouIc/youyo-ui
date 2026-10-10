<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="configForm.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="configForm.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="configForm.disabled" />
    </a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-range-picker v-if="configForm.range" v-model:value="defaultRange" :value-format="configForm.valueFormat" />
      <a-date-picker v-else v-model:value="defaultDate" :picker="configForm.picker" :value-format="configForm.valueFormat" />
    </a-form-item>
    <a-form-item label="日期范围" name="range"><a-switch v-model:checked="configForm.range" /></a-form-item>
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="configForm.placeholder" />
    </a-form-item>
    <a-form-item label="显示格式" name="format"><a-input v-model:value="dateFormat" /></a-form-item>
    <a-form-item label="最早日期" name="minDate"><a-date-picker v-model:value="configForm.minDate" value-format="YYYY-MM-DD" /></a-form-item>
    <a-form-item label="最晚日期" name="maxDate"><a-date-picker v-model:value="configForm.maxDate" value-format="YYYY-MM-DD" /></a-form-item>
    <a-form-item label="类型" name="picker">
      <a-select v-model:value="configForm.picker">
        <a-select-option value="date">日期</a-select-option>
        <a-select-option value="week">周</a-select-option>
        <a-select-option value="month">月</a-select-option>
        <a-select-option value="quarter">季度</a-select-option>
        <a-select-option value="year">年</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="DatePickerConfig">
import { defineProps, defineEmits, computed } from 'vue';

type Form = {
  label: string;
  name: string;
  defaultValue: string | string[];
  required: boolean;
  placeholder: string;
  disabled: boolean;
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
  format: string;
  valueFormat: string;
  range: boolean;
  minDate?: string;
  maxDate?: string;
};

const props = defineProps<{ form: Form }>();

const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();

const configForm = computed({
  get() {
    return props.form;
  },
  set(val) {
    emits('update:form', val);
  },
});
const defaultDate = computed({
  get: () => (Array.isArray(configForm.value.defaultValue) ? undefined : configForm.value.defaultValue),
  set: value => (configForm.value.defaultValue = value ?? ''),
});
const defaultRange = computed({
  get: () => (Array.isArray(configForm.value.defaultValue) ? configForm.value.defaultValue : undefined),
  set: value => (configForm.value.defaultValue = value ?? []),
});
const dateFormat = computed({
  get: () => configForm.value.format,
  set: value => {
    configForm.value.format = value;
    configForm.value.valueFormat = value;
  },
});
</script>

<style scoped></style>
