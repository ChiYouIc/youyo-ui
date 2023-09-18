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
    <a-form-item label="占位符" name="placeholder">
      <a-input v-model:value="form.placeholder" />
    </a-form-item>
    <a-form-item label="候选项" name="options">
      <template v-for="option in form.options">
        <a-row :gutter="10" style="align-items: center; margin-bottom: 10px">
          <a-col :span="11">
            <a-input v-model:value="option.label" placeholder="请输入label" />
          </a-col>
          <a-col :span="11">
            <a-input v-model:value="option.value" placeholder="请输入value" />
          </a-col>
          <a-col :span="2">
            <minus-circle-outlined />
          </a-col>
        </a-row>
      </template>
      <a-button type="dashed" block @click="onAddOption">
        <plus-outlined />
        新增
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="SelectConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

type SelectConfigProps = {
  form: {
    label: string;
    value: string;
    required: boolean;
    disabled: boolean;
    placeholder: string;
    options: { label: string; value: string }[];
  };
};

const props = defineProps<SelectConfigProps>();

function onAddOption() {
  props.form.options.push({ label: '', value: '' });
}
</script>
<style scoped></style>
