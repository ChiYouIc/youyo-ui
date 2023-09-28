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
import { CloseOutlined } from '@ant-design/icons-vue';
import Factory from '../factory/index.vue';
import AbstractComponent from '../core/AbstractComponent';
import useConfigHook from '../hooks/useConfigHook';

interface DraggableItemProps {
  element: any;
}

interface DraggableItemEmits {
  (event: 'click', val: AbstractComponent<any>): void;
  (event: 'remove', val: AbstractComponent<any>): void;
}

defineProps<DraggableItemProps>();

const emits = defineEmits<DraggableItemEmits>();

const { setValue } = useConfigHook();

function onClick(item: AbstractComponent<any>): void {
  emits('click', item);
  setValue(item);
}

function onRemove(item: AbstractComponent<any>): void {
  emits('remove', item);
}
</script>

<style scoped></style>
