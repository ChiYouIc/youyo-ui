<template>
  <a-form :model="configForm">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="configForm!.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="configForm.name" />
    </a-form-item>
    <a-form-item label="自定义列" name="options">
      <a-form :model="configForm.columns">
        <template v-for="(option, index) in configForm.columns" :key="index">
          <a-row :gutter="5">
            <a-col :span="11">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.title" placeholder="请输入label" />
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.prop" placeholder="请输入dataIndex" />
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
<script setup lang="ts" name="TableConfig">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { computed, defineEmits, defineProps } from 'vue';
import { TableColumnType } from '../../core/entity/Table';

type Form = {
  label: string;
  name: string;
  columns: TableColumnType[];
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

function onRemoveOption(option: TableColumnType, index: number) {
  configForm.value.columns.splice(index, 1);
}

function onAddOption() {
  configForm.value.columns.push({ title: '', prop: '' });
}
</script>

<style scoped></style>
