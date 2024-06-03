<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="configForm.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
    </a-form-item>
    <a-form-item label="默认值" name="defaultValue">
      <a-select v-model:value="configForm.defaultValue" placeholder="请选择默认值" :options="form.options" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="configForm.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="configForm.disabled" />
    </a-form-item>
    <a-form-item label="按钮类型" name="optionType">
      <a-select v-model:value="configForm.optionType">
        <a-select-option value="default">Default</a-select-option>
        <a-select-option value="button">Button</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="候选项" name="options">
      <a-form :model="configForm.options">
        <template v-for="(option, index) in configForm.options" :key="index">
          <a-row :gutter="5">
            <a-col :span="11">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.label" placeholder="请输入label" />
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.value" placeholder="请输入value" />
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
      <a-button type="dashed" block @click="onAddOption">
        <plus-outlined />
        新增
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="RadioConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { computed, defineEmits, defineProps } from 'vue';

interface Form {
  label: string;
  name: string;
  defaultValue: string;
  required: boolean;
  disabled: boolean;
  optionType: 'button' | 'default';
  options: Array<{ label: string; value: string; disabled?: boolean }>;
}

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
  configForm.value.options.push({ label: '', value: '' });
}

function onRemoveOption(_: { label: string; value: string }, index: number) {
  configForm.value.options.splice(index, 1);
}
</script>

<style scoped></style>
