<template>
  <div class="form-design">
    <draggable-component
      :class="['form-design-draggable', componentList.length === 0 ? 'empty-draggable' : '']"
      v-model:list="componentList"
      :move="onMove"
      tag="ul"
      group="design"
      item-key="id"
      @change="onChange"
    >
      <template #header>
        <div class="draggable-header">
          <span class="title">{{ name }}</span>
          <a-tooltip :overlayStyle="{ width: '100%' }">
            <template #title>
              <p>Id: {{ id }}</p>
              <p>Name: {{ name }}</p>
              <p>Version: {{ version }}</p>
              <p>Description: {{ description }}</p>
            </template>
            <question-circle-outlined />
          </a-tooltip>
          <a-button type="primary" @click="$emit('clean')">清空</a-button>
          <a-button type="primary" @click="$emit('preview')">预览</a-button>
        </div>
      </template>
      <template #item="{ element }">
        <draggable-item :element="element" @click="onDraggableItemClick" @remove="el => $emit('remove', el)" />
      </template>
    </draggable-component>
  </div>
</template>

<script setup lang="ts" name="form-design">
import './style/design.less';

import DraggableComponent from 'vuedraggable';
import { defineEmits, defineProps } from 'vue';
import 'vue-json-pretty/lib/styles.css';
import AbstractComponent from '../core/AbstractComponent';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import DraggableItem from './draggableItem.vue';
import useDraggableHook from '../hooks/useDraggableHook';

interface DesignProps {
  components: () => Array<AbstractComponent>;
  id: string;
  name: string;
  version: string;
  description: string;
}

interface DesignEmits {
  (event: 'preview'): void;

  (event: 'clean'): void;

  (event: 'remove', val: any): void;

  (event: 'click', val: AbstractComponent): void;
}

const props = defineProps<DesignProps>();
const emits = defineEmits<DesignEmits>();

const componentList = props.components();

function onChange(e) {
  const added = e?.added;
  if (added) {
    console.log('design onChange', added);
  }
}

function onMove(obj: any) {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}

function onDraggableItemClick(val: AbstractComponent) {
  console.log('design onDraggableItemClick', val);
  emits('click', val);
}
</script>

<style scoped></style>
