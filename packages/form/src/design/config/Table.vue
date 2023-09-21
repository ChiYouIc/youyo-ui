<template>
  <a-form :model="form">
    <a-form-item label="标签" name="label">
      <a-input v-model:value="form!.label" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="自定义列" name="options">
      <a-form :model="form.columns">
        <template v-for="(option, index) in form.columns" :key="index">
          <a-row :gutter="5">
            <a-col :span="11">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.title" placeholder="请输入label" />
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item style="margin-bottom: 5px">
                <a-input v-model:value="option.dataIndex" placeholder="请输入value" />
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
import { TableColumnType } from 'ant-design-vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

type TableProps = {
  form: {
    label: string;
    name: string;
    columns: TableColumnType[];
  };
};

const props = defineProps<TableProps>();

function onRemoveOption() {}

function onAddOption() {
  props.form.columns.push({ title: '', dataIndex: '' });
}
</script>

<style scoped></style>
