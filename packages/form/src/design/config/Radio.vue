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
    <a-form-item label="按钮类型" name="optionType">
      <a-select v-model:value="configForm.optionType">
        <a-select-option value="default">Default</a-select-option>
        <a-select-option value="button">Button</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="排列方向" name="direction">
      <a-select v-model:value="configForm.direction">
        <a-select-option value="horizontal">横向</a-select-option>
        <a-select-option value="vertical">纵向</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-if="configForm.optionType === 'button'" label="按钮尺寸" name="buttonSize">
      <a-select v-model:value="configForm.buttonSize">
        <a-select-option value="large">大</a-select-option>
        <a-select-option value="middle">中</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
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
            <a-col :span="4">
              <a-form-item style="margin-bottom: 5px">
                <a-switch v-model:checked="option.disabled" size="small" />
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
  defaultValue: string | number;
  required: boolean;
  disabled: boolean;
  optionType: 'button' | 'default';
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  direction: 'horizontal' | 'vertical';
  buttonSize: 'large' | 'middle' | 'small';
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
