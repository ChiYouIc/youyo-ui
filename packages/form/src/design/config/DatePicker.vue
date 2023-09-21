<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="form.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="form.disabled" />
    </a-form-item>
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="form.placeholder" />
    </a-form-item>
    <a-form-item label="类型" name="picker">
      <a-select v-model:value="form.picker">
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
import { DateType } from '../../types';

type DatePickerProps = {
  form: {
    label: string;
    name: string;
    value: DateType;
    required: boolean;
    placeholder: string;
    disabled: boolean;
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
  };
};

defineProps<DatePickerProps>();
</script>

<style scoped></style>
