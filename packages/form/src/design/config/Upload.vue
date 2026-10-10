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
    <a-form-item label="按钮文案" name="placeholder">
      <a-input v-model:value="configForm.placeholder" />
    </a-form-item>
    <a-form-item label="文件类型" name="accept">
      <a-input v-model:value="configForm.accept" placeholder=".png,.jpg,application/pdf" />
    </a-form-item>
    <a-form-item label="多文件" name="multiple"><a-switch v-model:checked="configForm.multiple" /></a-form-item>
    <a-form-item label="最多文件数" name="maxCount">
      <a-input-number v-model:value="configForm.maxCount" :min="1" :disabled="!configForm.multiple" />
    </a-form-item>
    <a-form-item label="单文件大小限制 (MB)" name="maxSize">
      <a-input-number v-model:value="configForm.maxSize" :min="0.1" :step="0.1" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="UploadConfig">
import { computed, defineEmits, defineProps } from 'vue';

type Form = {
  label: string;
  name: string;
  required: boolean;
  disabled: boolean;
  placeholder: string;
  accept: string;
  multiple: boolean;
  maxCount?: number;
  maxSize?: number;
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
