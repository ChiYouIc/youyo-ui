<template>
  <li>
    <div class="draggable-item" :style="{ borderColor: token.colorPrimary }">
      <div class="draggable-item-label" :item-label-type="element.component">
        <label :class="{ 'marker-required': element.required }">{{ element.label }}</label>
      </div>
      <div class="draggable-item-content">
        <factory :el="element" />
      </div>
      <div class="draggable-item-action">
        <EditOutlined :style="{ color: token.colorPrimary }" @click.stop="onClick(element)" />
        <DeleteOutlined :style="{ color: token.colorError }" @click.stop="onRemove(element)" />
      </div>
    </div>
  </li>
</template>
<script setup lang="ts" name="draggable-item">
import './style/draggable-item.less';
import { defineProps } from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { theme } from 'ant-design-vue';
import Factory from '../factory/index.vue';
import type { AbstractComponent } from '../core';
import { useMitt } from '../hooks';

interface DraggableItemProps {
  element: AbstractComponent;
}

defineProps<DraggableItemProps>();

const { emit } = useMitt();
const { useToken } = theme;
const { token } = useToken();

function onClick(item: AbstractComponent): void {
  emit('toConfig', item);
}

function onRemove(item: AbstractComponent): void {
  emit('toRemove', item);
}
</script>

<style scoped></style>
