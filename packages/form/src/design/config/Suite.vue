<template>
  <a-form :model="configForm">
    <a-form-item label="标题" name="label">
      <a-input v-model:value="configForm.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
      <div class="suite-config__hint">内部字段名以该名称作为前缀，同一表单可放置多个同类套件。</div>
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="configForm.required" />
      <div class="suite-config__hint">打开后套件内所有字段都会变为必填。</div>
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="configForm.disabled" />
    </a-form-item>
    <a-form-item label="内部字段">
      <ul class="suite-config__fields">
        <li v-for="field in configForm.fields" :key="field.primaryId()">
          <span class="suite-config__field-label">{{ field.label }}</span>
          <span class="suite-config__field-name">{{ field.name }}</span>
        </li>
      </ul>
      <div class="suite-config__hint">字段清单与跨字段校验由套件代码固定，设计器中不可增删。</div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="SuiteConfig">
import { computed } from 'vue';
import type { ComponentModel } from '../../core/types';

interface Form {
  label: string;
  name: string;
  required: boolean;
  disabled: boolean;
  fields: Array<ComponentModel>;
}

const props = defineProps<{ form: Form }>();
const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();

const configForm = computed({
  get: () => props.form,
  set: val => emits('update:form', val),
});
</script>

<style scoped>
.suite-config__hint {
  margin-top: 4px;
  color: var(--youyo-color-text-tertiary);
  font-size: 12px;
  line-height: 1.5;
}

.suite-config__fields {
  margin: 0;
  padding: 0;
  list-style: none;
}

.suite-config__fields li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid var(--youyo-color-border-secondary);
  border-radius: 6px;
  background: var(--youyo-color-fill-tertiary);
}

.suite-config__fields li + li {
  margin-top: 6px;
}

.suite-config__field-label {
  color: var(--youyo-color-text);
  font-size: 12px;
}

.suite-config__field-name {
  color: var(--youyo-color-text-tertiary);
  font-family: monospace;
  font-size: 11px;
}
</style>
