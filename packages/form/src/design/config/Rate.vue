<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="默认值" name="value">
      <a-input-number v-model:value="form.value" placeholder="请选择默认值" :min="0" :max="form.count" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="form.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="form.disabled" />
    </a-form-item>
    <a-form-item label="半选" name="allowHalf">
      <a-switch v-model:checked="form.allowHalf" />
    </a-form-item>
    <a-form-item label="star 总数" name="count">
      <a-input-number v-model:value="form.count" :min="5" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="RateConfig">
type RateConfigProps = {
  form: {
    label: string;
    name: string;
    value: string;
    required: boolean;
    disabled: boolean;
    count: number;
    allowHalf: boolean;
  };
};

defineProps<RateConfigProps>();
</script>

<style scoped></style>
