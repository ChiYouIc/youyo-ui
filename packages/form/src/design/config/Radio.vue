<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form.label" />
    </a-form-item>
    <a-form-item label="默认值" name="value">
      <a-select v-model:value="form.value" placeholder="请选择默认值" :options="form.options" />
    </a-form-item>
    <a-form-item label="必填" name="required">
      <a-switch v-model:checked="form.required" />
    </a-form-item>
    <a-form-item label="禁用" name="disabled">
      <a-switch v-model:checked="form.disabled" />
    </a-form-item>
    <a-form-item label="按钮类型" name="disabled">
      <a-select v-model:value="form.optionType">
        <a-select-option value="default">Default</a-select-option>
        <a-select-option value="button">Button</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="候选项" name="options">
      <a-form-item label="候选项" name="options">
        <a-form :model="form.options">
          <template v-for="(option, index) in form.options" :key="index">
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
        <a-button type="dashed" block @click="onAddOption"><plus-outlined />新增</a-button>
      </a-form-item>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="RadioConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

interface RadioProps {
  form: {
    label: string;
    value: string;
    required: boolean;
    disabled: boolean;
    optionType: 'button' | 'default';
    options: Array<{ label: string; value: string; disabled?: boolean }>;
  };
}

const props = defineProps<RadioProps>();
function onAddOption() {
  props.form.options.push({ label: '', value: '' });
}

function onRemoveOption(_: { label: string; value: string }, index: number) {
  props.form.options.splice(index, 1);
}
</script>

<style scoped></style>
