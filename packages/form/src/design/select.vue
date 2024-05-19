<template>
  <div class="form-select">
    <a-divider orientation="left">组件</a-divider>
    <draggable-component id="design" v-model:list="selectOptions" tag="ul" :group="{ name: 'design', pull: 'clone', put: false }" item-key="id" :move="onMove" :clone="onClone">
      <template #item="{ element }">
        <li class="component-item">
          <span>{{ element.component }}</span>
          <span>{{ element.name }}</span>
          <span>
            <a-tooltip :title="element.description">
              <question-circle-outlined />
            </a-tooltip>
          </span>
        </li>
      </template>
    </draggable-component>
    <a-divider orientation="left">套件</a-divider>
  </div>
</template>

<script setup lang="ts">
import './style/select.less';
import { ref } from 'vue';
import { uuid } from 'vue-uuid';
import DraggableComponent from 'vuedraggable';
import AbstractComponent from '../core/AbstractComponent';
import componentFactory from '../core/Factory';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import useDraggableHook from '../hooks/useDraggableHook';
import { ComponentModeType } from '../types';

type ComponentSelectType = {
  name: string;
  component: ComponentModeType;
  description: string;
};

const selectOptions = ref<Array<ComponentSelectType>>([
  { name: '输入框', component: 'Input', description: '输入框' },
  { name: '选择框', component: 'Select', description: '选择框' },
  { name: '数字输入框', component: 'InputNumber', description: '数字输入框' },
  { name: '单选框', component: 'Radio', description: '单选框' },
  { name: '评分', component: 'Rate', description: '评分' },
  { name: '开关', component: 'Switch', description: '开关' },
  { name: '时间选择框', component: 'TimePicker', description: '时间选择框' },
  { name: '日期选择框', component: 'DatePicker', description: '日期选择框' },
  { name: '上传', component: 'Upload', description: '上传' },
  { name: '表格', component: 'Table', description: '表格' },
  { name: '栅栏', component: 'Fence', description: '栅栏' },
]);

function onMove(obj) {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}

const count = ref<number>(1);

function onClone(obj: ComponentSelectType): AbstractComponent {
  return componentFactory.creator({
    id: uuid.v1(),
    label: obj.name,
    name: `filed${count.value++}`,
    component: obj.component,
    required: false,
    disabled: false,
  });
}
</script>

<style scoped></style>
