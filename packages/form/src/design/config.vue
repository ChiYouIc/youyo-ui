<template>
  <div class="form-config">
    <a-form v-if="form" :model="form">
      <a-form-item label="默认值" name="defaultValue">
        <a-input v-model:value="form.defaultValue" />
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
    </a-form>
  </div>
</template>
<script setup lang="ts" name="form-config">
import './style/config.less';
import useConfigHook from '../hooks/useConfigHook';
import { ref } from 'vue';
import { FormItemType } from '../types';
const { onChanged } = useConfigHook();

const form = ref<FormItemType>();

onChanged(item => (form.value = item.config));
</script>

<style scoped></style>
