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
          <a-button type="primary" @click="onFormClean">清空</a-button>
          <a-button type="primary" @click="$emit('preview')">预览</a-button>
          <a-button type="primary" @click="onConfig">配置</a-button>
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
import DraggableItem from './draggableItem.vue';
import type { Form } from '../core';
import { useMitt, useDraggableHook } from '../hooks';

interface DesignEmits {
  (event: 'preview'): void;
}

const props = defineProps<{ form: Form }>();
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

function onConfig() {
  emit('toConfig', props.form);
}
</script>

<style scoped></style>
