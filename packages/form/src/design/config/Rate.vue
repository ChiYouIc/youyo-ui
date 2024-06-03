<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="configForm.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
    </a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-input-number v-model:value="configForm.defaultValue" placeholder="请选择默认值" :min="0" :max="configForm.count" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="configForm.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="configForm.disabled" />
    </a-form-item>
    <a-form-item label="半选" name="allowHalf">
      <a-switch v-model:checked="configForm.allowHalf" />
    </a-form-item>
    <a-form-item label="star 总数" name="count">
      <a-input-number v-model:value="configForm.count" :min="5" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="RateConfig">
import { computed, defineEmits, defineProps } from 'vue';

type Form = {
  label: string;
  name: string;
  defaultValue: string;
  required: boolean;
  disabled: boolean;
  count: number;
  allowHalf: boolean;
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
