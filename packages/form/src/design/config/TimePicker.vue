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
      <a-time-range-picker v-if="configForm.range" v-model:value="defaultRange" :format="configForm.format" :value-format="configForm.valueFormat" />
      <a-time-picker v-else v-model:value="defaultTime" :format="configForm.format" :value-format="configForm.valueFormat" />
    </a-form-item>
    <a-form-item label="时间范围" name="range"><a-switch v-model:checked="configForm.range" /></a-form-item>
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="configForm.placeholder" />
    </a-form-item>
    <a-form-item label="格式" name="format">
      <a-select v-model:value="format">
        <a-select-option value="HH">HH</a-select-option>
        <a-select-option value="HH:mm">HH:mm</a-select-option>
        <a-select-option value="mm:ss">mm:ss</a-select-option>
        <a-select-option value="HH:mm:ss">HH:mm:ss</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="小时选项间隔" name="hourStep">
      <a-input-number v-model:value="configForm.hourStep" :min="1" :max="24" />
    </a-form-item>
    <a-form-item label="分钟选项间隔" name="minuteStep">
      <a-input-number v-model:value="configForm.minuteStep" :min="1" :max="60" />
    </a-form-item>
    <a-form-item label="秒钟选项间隔" name="secondStep">
      <a-input-number v-model:value="configForm.secondStep" :min="1" :max="60" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="TimePickerConfig">
import { computed, defineEmits, defineProps } from 'vue';

type Form = {
  label: string;
  name: string;
  defaultValue: string | string[];
  required: boolean;
  placeholder: string;
  disabled: boolean;
  format: string;
  valueFormat: string;
  range: boolean;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
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
const format = computed({
  get: () => props.form.format,
  set: val => {
    configForm.value.format = val;
    configForm.value.valueFormat = val;
  },
});
const defaultTime = computed({
  get: () => (Array.isArray(configForm.value.defaultValue) ? undefined : configForm.value.defaultValue),
  set: value => (configForm.value.defaultValue = value ?? ''),
});
const defaultRange = computed({
  get: () => (Array.isArray(configForm.value.defaultValue) ? configForm.value.defaultValue : undefined),
  set: value => (configForm.value.defaultValue = value ?? []),
});
</script>

<style scoped></style>
