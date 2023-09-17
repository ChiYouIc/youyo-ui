<template>
  <div class="form-select">
    <draggable-component v-model:list="selectOptions" tag="ul" :group="{ name: 'design', pull: 'clone', put: false }" item-key="id" :move="onMove" :clone="onClone">
      <template #item="{ element }">
        <li class="component-item">
          <span>{{ element.name }}</span>
          <span>{{ element.desc }}</span>
          <span>{{ element.component }}</span>
        </li>
      </template>
    </draggable-component>
  </div>
</template>

<script setup lang="ts">
import './style/select.less';
import { ref } from 'vue';
import { uuid } from 'vue-uuid';
import DraggableComponent from 'vuedraggable';
import { ComponentSelectType } from '../types';
import useFormHook from '../hooks/useFormHook';
import AbstractComponent from '../core/AbstractComponent';

const selectOptions = ref<Array<ComponentSelectType>>([
  { id: 0, name: 'Input', desc: '输入框', component: 'a-input' },
  { id: 1, name: 'Select', desc: '输入框', component: 'a-select' },
  { id: 2, name: 'InputNumber', desc: '输入框', component: 'a-input-number' },
  { id: 3, name: 'Radio', desc: '输入框', component: 'a-radio' },
  { id: 4, name: 'Rate', desc: '输入框', component: 'a-rate' },
  { id: 5, name: 'Switch', desc: '输入框', component: 'a-switch' },
  { id: 6, name: 'TimePicker', desc: '输入框', component: 'a-time-picker' },
  { id: 7, name: 'DatePicker', desc: '输入框', component: 'a-date-picker' },
  { id: 7, name: 'Upload', desc: '输入框', component: 'a-upload' },
]);

function onMove(obj) {
  return obj.from !== obj.to;
}

function onClone(obj: ComponentSelectType): AbstractComponent {
  const { save } = useFormHook();

  return save({
    id: uuid.v1(),
    name: obj.name,
    component: obj.component,
  });
}
</script>

<style scoped></style>
