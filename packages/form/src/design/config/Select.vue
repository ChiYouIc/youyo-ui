<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="form.name" />
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
  </a-form>
</template>

<script setup lang="ts" name="SelectConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

type SelectConfigProps = {
  form: {
    label: string;
    name: string;
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

function onRemoveOption(_: { label: string; value: string }, index: number) {
  props.form.options.splice(index, 1);
}
</script>
<style scoped></style>
