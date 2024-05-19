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
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="configForm.placeholder" />
    </a-form-item>
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
  defaultValue: string;
  required: boolean;
  placeholder: string;
  disabled: boolean;
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
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
</script>

<style scoped></style>
