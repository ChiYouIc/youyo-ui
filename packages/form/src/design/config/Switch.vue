<template>
  <a-form :model="form">
    <a-form-item label="默认值" name="defaultValue">
      <a-switch v-model:checked="form!.value" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="form!.disabled" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="switch">
type InputConfigProps = {
  form: {
    value: string;
    disabled: boolean;
  };
};

defineProps<InputConfigProps>();
</script>

<style scoped></style>
