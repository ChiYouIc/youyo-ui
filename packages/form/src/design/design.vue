<template>
  <div class="form-design">
    <draggable-component
      :class="['form-design-draggable', form.components.length === 0 ? 'empty-draggable' : '']"
      v-model:list="form.components"
      :move="onMove"
      tag="ul"
      group="design"
      item-key="id"
      @change="onChange"
    >
      <template #header>
        <div class="draggable-header">
          <span class="title">{{ form.name }}</span>
          <a-tooltip :overlayStyle="{ width: '100%' }">
            <template #title>
              <p>Id: {{ form.id }}</p>
              <p>Name: {{ form.name }}</p>
              <p>Version: {{ form.version }}</p>
              <p>Description: {{ form.description }}</p>
            </template>
            <question-circle-outlined />
          </a-tooltip>
          <a-button type="primary" @click="onFormClean">清空</a-button>
          <a-button type="primary" @click="$emit('preview')">预览</a-button>
        </div>
      </template>
      <template #item="{ element }">
        <draggable-item :element="element" />
      </template>
    </draggable-component>
  </div>
</template>

<script setup lang="ts" name="form-design">
import './style/design.less';

import DraggableComponent from 'vuedraggable';
import { defineEmits, defineProps } from 'vue';
import 'vue-json-pretty/lib/styles.css';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import DraggableItem from './draggableItem.vue';
import useDraggableHook from '../hooks/useDraggableHook';
import Form from '../core/Form';
import { useMitt } from '../hooks/useMitt';

interface DesignEmits {
  (event: 'preview'): void;
}

defineProps<{ form: Form }>();
defineEmits<DesignEmits>();

const { emit } = useMitt();

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

function onFormClean() {
  emit('toClean');
}
</script>

<style scoped></style>
