<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form!.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-input v-model:value="form!.value" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="form!.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="form!.disabled" />
    </a-form-item>
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="form!.placeholder" />
    </a-form-item>
    <a-form-item label="最大值" name="max">
      <a-input-number v-model:value="form!.max" />
    </a-form-item>
    <a-form-item label="最小值" name="min">
      <a-input-number v-model:value="form!.min" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="InputNumberConfig">
type InputNumberProps = {
  form: {
    label: string;
    name: string;
    value: string;
    required: boolean;
    disabled: boolean;
    placeholder: string;
    max: number;
    min: number;
  };
};

defineProps<InputNumberProps>();
</script>

<style scoped></style>
