<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="configForm.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
    </a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-input v-model:value="configForm.defaultValue" />
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
    <a-form-item label="最大值" name="max">
      <a-input-number v-model:value="configForm.max" />
    </a-form-item>
    <a-form-item label="最小值" name="min">
      <a-input-number v-model:value="configForm.min" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="InputNumberConfig">
import { computed, defineEmits, defineProps } from 'vue';

type Form = {
  label: string;
  name: string;
  defaultValue: string;
  required: boolean;
  disabled: boolean;
  placeholder: string;
  max: number;
  min: number;
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
