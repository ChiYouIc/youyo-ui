<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="configForm.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
    </a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-select v-model:value="configForm.defaultValue" placeholder="请选择默认值" :options="configForm.options" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="configForm.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="configForm.disabled" />
    </a-form-item>
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="configForm.placeholder" />
    </a-form-item>
    <a-form-item label="选择模式" name="mode">
      <a-select v-model:value="configForm.mode" allow-clear>
        <a-select-option value="multiple">多选</a-select-option>
        <a-select-option value="tags">标签</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="搜索" name="showSearch"><a-switch v-model:checked="configForm.showSearch" /></a-form-item>
    <a-form-item label="允许清空" name="allowClear"><a-switch v-model:checked="configForm.allowClear" /></a-form-item>
    <a-form-item v-if="configForm.mode" label="最多选择" name="maxCount">
      <a-input-number v-model:value="configForm.maxCount" :min="1" />
    </a-form-item>
    <a-form-item label="候选项" name="options">
      <a-form :model="configForm.options">
        <template v-for="(option, index) in configForm.options" :key="index">
          <a-row :gutter="5">
            <a-col :span="9">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.label" placeholder="请输入label" />
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.value" placeholder="请输入value" />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item style="margin-bottom: 5px">
                <a-switch v-model:checked="option.disabled" size="small" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item style="margin-bottom: 5px">
                <minus-circle-outlined @click="onRemoveOption(option, index)" style="cursor: pointer" />
              </a-form-item>
            </a-col>
          </a-row>
        </template>
      </a-form>
      <a-button type="dashed" block @click="onAddOption"><plus-outlined />新增</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="SelectConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { computed, defineEmits, defineProps } from 'vue';

type Form = {
  label: string;
  name: string;
  defaultValue: string | number | Array<string | number>;
  required: boolean;
  disabled: boolean;
  placeholder: string;
  options: { label: string; value: string | number; disabled?: boolean }[];
  mode?: 'multiple' | 'tags';
  showSearch: boolean;
  allowClear: boolean;
  maxCount?: number;
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
function onAddOption() {
  configForm.value.options.push({ label: '', value: '', disabled: false });
}

function onRemoveOption(_: { label: string; value: string }, index: number) {
  configForm.value.options.splice(index, 1);
}
</script>
<style scoped></style>
