<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label"><a-input v-model:value="configForm.label" /></a-form-item>
    <a-form-item label="名称" name="name"><a-input v-model:value="configForm.name" /></a-form-item>
    <a-form-item label="默认值" name="defaultValue"><a-textarea v-model:value="configForm.defaultValue" /></a-form-item>
    <a-form-item label="必填" name="required"><a-switch v-model:checked="configForm.required" /></a-form-item>
    <a-form-item label="禁用" name="disabled"><a-switch v-model:checked="configForm.disabled" /></a-form-item>
    <a-form-item label="占位符" name="placeholder"><a-input v-model:value="configForm.placeholder" /></a-form-item>
    <a-form-item label="行数" name="rows"><a-input-number v-model:value="configForm.rows" :min="2" :max="20" /></a-form-item>
    <a-form-item label="最大长度" name="maxlength"><a-input-number v-model:value="configForm.maxlength" :min="1" /></a-form-item>
    <a-form-item label="显示字数" name="showCount"><a-switch v-model:checked="configForm.showCount" /></a-form-item>
    <a-form-item label="允许清空" name="allowClear"><a-switch v-model:checked="configForm.allowClear" /></a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="TextareaConfig">
import { computed } from 'vue';

type Form = {
  label: string; name: string; defaultValue: string; required: boolean; disabled: boolean;
  placeholder: string; rows: number; maxlength: number; showCount: boolean; allowClear: boolean;
};
const props = defineProps<{ form: Form }>();
const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();
const configForm = computed({ get: () => props.form, set: val => emits('update:form', val) });
</script>
