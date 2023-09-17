<template>
  <a-form :model="form">
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
    <a-form-item label="输入最大长度" name="maxlength">
      <a-input-number v-model:value="form!.maxlength" :min="50" :max="1000" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="input">
type InputConfigProps = {
  form: {
    value: string;
    required: boolean;
    disabled: boolean;
    placeholder: string;
    maxlength: number;
  };
};

defineProps<InputConfigProps>();
</script>

<style scoped></style>
