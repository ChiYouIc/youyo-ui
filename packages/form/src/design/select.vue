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
import { FormComponentType, FormItemType } from '../types';

const selectOptions = ref<Array<FormComponentType>>([
  { id: 0, name: 'input', desc: '输入框', component: 'a-input' },
  { id: 1, name: 'select', desc: '输入框', component: 'a-select' },
  { id: 2, name: 'input number', desc: '输入框', component: 'a-input-number' },
  { id: 3, name: 'radio', desc: '输入框', component: 'a-radio' },
  { id: 4, name: 'rate', desc: '输入框', component: 'a-rate' },
  { id: 5, name: 'switch', desc: '输入框', component: 'a-switch' },
  { id: 6, name: 'time picker', desc: '输入框', component: 'a-time-picker' },
  { id: 7, name: 'date picker', desc: '输入框', component: 'a-date-picker' },
  { id: 7, name: 'upload', desc: '输入框', component: 'a-upload' },
]);

function onMove(obj) {
  return obj.from !== obj.to;
}

function onClone(obj: FormComponentType): FormItemType {
  return {
    id: uuid.v1(),
    name: obj.name,
    component: obj.component,
    config: {
      defaultValue: undefined,
      required: false,
      rule: '',
      disabled: false,
      placeholder: 'hahah',
    },
  };
}
</script>

<style scoped></style>
