<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label"><a-input v-model:value="configForm.label" /></a-form-item>
    <a-form-item label="名称" name="name"><a-input v-model:value="configForm.name" /></a-form-item>
    <a-form-item label="必填" name="required"><a-switch v-model:checked="configForm.required" /></a-form-item>
    <a-form-item label="禁用" name="disabled"><a-switch v-model:checked="configForm.disabled" /></a-form-item>
    <a-form-item label="最小值" name="min"><a-input-number v-model:value="configForm.min" /></a-form-item>
    <a-form-item label="最大值" name="max"><a-input-number v-model:value="configForm.max" /></a-form-item>
    <a-form-item label="步长" name="step"><a-input-number v-model:value="configForm.step" :min="0.001" :step="0.1" /></a-form-item>
    <a-form-item label="范围选择" name="range"><a-switch v-model:checked="configForm.range" /></a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="SliderConfig">
import { computed } from 'vue';

type Form = {
  label: string;
  name: string;
  required: boolean;
  disabled: boolean;
  min: number;
  max: number;
  step: number;
  range: boolean;
};

const props = defineProps<{ form: Form }>();
const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();
const configForm = computed({
  get: () => props.form,
  set: val => emits('update:form', val),
});
</script>
