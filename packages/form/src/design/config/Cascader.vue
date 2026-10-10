<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label"><a-input v-model:value="configForm.label" /></a-form-item>
    <a-form-item label="名称" name="name"><a-input v-model:value="configForm.name" /></a-form-item>
    <a-form-item label="必填" name="required"><a-switch v-model:checked="configForm.required" /></a-form-item>
    <a-form-item label="禁用" name="disabled"><a-switch v-model:checked="configForm.disabled" /></a-form-item>
    <a-form-item label="默认值路径" name="defaultValue">
      <a-input v-model:value="defaultValueText" placeholder='例如 ["zhejiang","hangzhou"]' @blur="applyDefaultValue" />
      <div v-if="defaultValueError" class="error">{{ defaultValueError }}</div>
    </a-form-item>
    <a-form-item label="占位符" name="placeholder"><a-input v-model:value="configForm.placeholder" /></a-form-item>
    <a-form-item label="允许清空" name="allowClear"><a-switch v-model:checked="configForm.allowClear" /></a-form-item>
    <a-form-item label="可选中父级" name="changeOnSelect"><a-switch v-model:checked="configForm.changeOnSelect" /></a-form-item>
    <a-form-item label="搜索" name="showSearch"><a-switch v-model:checked="configForm.showSearch" /></a-form-item>
    <a-form-item label="候选项 JSON" name="options">
      <a-textarea v-model:value="optionsText" :rows="8" @blur="applyOptions" />
      <div v-if="optionsError" class="error">{{ optionsError }}</div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="CascaderConfig">
import { computed, ref, watch } from 'vue';

type Option = { label: string; value: string | number; disabled?: boolean; children?: Option[] };
type Form = {
  label: string; name: string; required: boolean; disabled: boolean; placeholder: string; defaultValue: Array<string | number>;
  allowClear: boolean; changeOnSelect: boolean; showSearch: boolean; options: Option[];
};
const props = defineProps<{ form: Form }>();
const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();
const configForm = computed({ get: () => props.form, set: val => emits('update:form', val) });
const optionsText = ref(JSON.stringify(props.form.options ?? [], null, 2));
const optionsError = ref('');
const defaultValueText = ref(JSON.stringify(props.form.defaultValue ?? []));
const defaultValueError = ref('');

watch(() => props.form.options, options => {
  optionsText.value = JSON.stringify(options ?? [], null, 2);
});
watch(() => props.form.defaultValue, value => {
  defaultValueText.value = JSON.stringify(value ?? []);
});

function applyDefaultValue() {
  try {
    const parsed = JSON.parse(defaultValueText.value);
    if (!Array.isArray(parsed) || parsed.some(value => !['string', 'number'].includes(typeof value))) {
      defaultValueError.value = '默认值必须是字符串或数字组成的路径数组';
      return;
    }
    configForm.value.defaultValue = parsed;
    defaultValueError.value = '';
  } catch (error) {
    defaultValueError.value = error instanceof Error ? error.message : 'JSON 格式无效';
  }
}

function applyOptions() {
  try {
    const parsed = JSON.parse(optionsText.value);
    if (!Array.isArray(parsed) || !parsed.every(isOption)) {
      optionsError.value = '候选项必须是包含 label、value 的有效 JSON 树';
      return;
    }
    configForm.value.options = parsed;
    optionsError.value = '';
  } catch (error) {
    optionsError.value = error instanceof Error ? error.message : 'JSON 格式无效';
  }
}

function isOption(value: unknown): value is Option {
  if (typeof value !== 'object' || value === null) return false;
  const option = value as Record<string, unknown>;
  if (typeof option.label !== 'string' || (typeof option.value !== 'string' && typeof option.value !== 'number')) return false;
  if (option.disabled !== undefined && typeof option.disabled !== 'boolean') return false;
  return option.children === undefined || (Array.isArray(option.children) && option.children.every(isOption));
}
</script>

<style scoped>
.error {
  color: var(--youyo-color-error);
  margin-top: 4px;
}
</style>
