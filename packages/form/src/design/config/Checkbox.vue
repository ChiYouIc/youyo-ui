<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label"><a-input v-model:value="configForm.label" /></a-form-item>
    <a-form-item label="名称" name="name"><a-input v-model:value="configForm.name" /></a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-select v-model:value="configForm.defaultValue" mode="multiple" :options="configForm.options" />
    </a-form-item>
    <a-form-item label="必填" name="required"><a-switch v-model:checked="configForm.required" /></a-form-item>
    <a-form-item label="禁用" name="disabled"><a-switch v-model:checked="configForm.disabled" /></a-form-item>
    <a-form-item label="排列方向" name="direction">
      <a-select v-model:value="configForm.direction">
        <a-select-option value="horizontal">横向</a-select-option>
        <a-select-option value="vertical">纵向</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="最少选择" name="minChecked"><a-input-number v-model:value="configForm.minChecked" :min="0" /></a-form-item>
    <a-form-item label="最多选择" name="maxChecked"><a-input-number v-model:value="configForm.maxChecked" :min="0" /></a-form-item>
    <a-form-item label="候选项" name="options">
      <template v-for="(option, index) in configForm.options" :key="index">
        <a-row :gutter="5">
          <a-col :span="9"><a-input v-model:value="option.label" placeholder="标签" /></a-col>
          <a-col :span="9"><a-input v-model:value="option.value" placeholder="值" /></a-col>
          <a-col :span="4"><a-switch v-model:checked="option.disabled" size="small" /></a-col>
          <a-col :span="2"><minus-circle-outlined @click="configForm.options.splice(index, 1)" /></a-col>
        </a-row>
      </template>
      <a-button type="dashed" block @click="configForm.options.push({ label: '', value: '' })"><plus-outlined />新增</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="CheckboxConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';

type Form = {
  label: string; name: string; defaultValue: Array<string | number>; required: boolean; disabled: boolean;
  direction: 'horizontal' | 'vertical'; minChecked?: number; maxChecked?: number;
  options: Array<{ label: string; value: string | number; disabled?: boolean }>;
};
const props = defineProps<{ form: Form }>();
const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();
const configForm = computed({ get: () => props.form, set: val => emits('update:form', val) });
</script>
