<template>
  <li class="draggable-item" @click="onClick(element)">
    <div class="draggable-item-label" v-if="element.component !== 'Fence'">
      <label :class="{ 'marker-required': element.required }">{{ element.label }}</label>
    </div>
    <div class="draggable-item-content">
      <factory :el="element" />
    </div>
    <div class="draggable-item-close">
      <CloseOutlined @click.stop="onRemove(element)" />
    </div>
  </li>
</template>
<script setup lang="ts" name="draggable-item">
import './style/draggable-item.less';
import { defineProps, defineEmits } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import Factory from '../factory/index.vue';
import AbstractComponent from '../core/AbstractComponent';

interface DraggableItemProps {
  element: AbstractComponent;
}

interface DraggableItemEmits {
  (event: 'click', val: AbstractComponent): void;

  (event: 'remove', val: AbstractComponent): void;
}

defineProps<DraggableItemProps>();

const emits = defineEmits<DraggableItemEmits>();

function onClick(item: AbstractComponent): void {
  console.log('draggableItem click', item);
  emits('click', item);
}

function onRemove(item: AbstractComponent): void {
  emits('remove', item);
}
</script>

<style scoped></style>
