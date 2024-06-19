<template>
  <li class="draggable-item" @click.stop="onClick(element)">
    <div class="draggable-item-label" :item-label-type="element.component">
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
import { defineProps } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import Factory from '../factory/index.vue';
import AbstractComponent from '../core/AbstractComponent';
import { useMitt } from '../hooks/useMitt';

interface DraggableItemProps {
  element: AbstractComponent;
}

defineProps<DraggableItemProps>();

const { emit } = useMitt();

function onClick(item: AbstractComponent): void {
  emit('toConfig', item);
}

function onRemove(item: AbstractComponent): void {
  console.log('sssssssssss');
  emit('toRemove', item);
}
</script>

<style scoped></style>
