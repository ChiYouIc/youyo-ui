<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form.label" />
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
    <a-form-item label="格式" name="format">
      <a-select v-model:value="format">
        <a-select-option value="HH">HH</a-select-option>
        <a-select-option value="HH:mm">HH:mm</a-select-option>
        <a-select-option value="mm:ss">mm:ss</a-select-option>
        <a-select-option value="HH:mm:ss">HH:mm:ss</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="小时选项间隔" name="hourStep">
      <a-input-number v-model:value="form.hourStep" :min="1" :max="24" />
    </a-form-item>
    <a-form-item label="分钟选项间隔" name="minuteStep">
      <a-input-number v-model:value="form.minuteStep" :min="1" :max="60" />
    </a-form-item>
    <a-form-item label="秒钟选项间隔" name="secondStep">
      <a-input-number v-model:value="form.secondStep" :min="1" :max="60" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="TimePickerConfig">
import { computed } from 'vue';
import { Dayjs } from 'dayjs';

type TimePickerProps = {
  form: {
    label: string;
    value: Dayjs | undefined;
    required: boolean;
    placeholder: string;
    disabled: boolean;
    format: string;
    valueFormat: string;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
  };
};

const props = defineProps<TimePickerProps>();

const format = computed({
  get: () => props.form.format,
  set: val => {
    props.form.format = val;
    props.form.valueFormat = val;
  },
});
</script>

<style scoped></style>
