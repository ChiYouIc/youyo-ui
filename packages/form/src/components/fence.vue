<template>
  <div :id="id" class="fence">
    <div v-for="(r, ri) in row" :key="r" class="fence-item">
      <draggable v-for="(c, ci) in col" :key="c" data-role="fence" item-key="id" group="design" tag="ul" :fence-id="ri * col + ci" :list="list[ri * col + ci]" :move="onMove">
        <template #item="{ element }">
          <draggable-item :element="element" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/fence.less';
import Draggable from 'vuedraggable';
import { defineProps } from 'vue';
import type { ComponentModel } from '../core/types';
import DraggableItem from '../design/draggableItem.vue';
import useDraggableHook from '../hooks/useDraggableHook';

interface FenceProps {
  id: string;
  row: number;
  col: number;
  list: Array<Array<ComponentModel>>;
}

defineProps<FenceProps>();

function onMove(obj: any): boolean {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}
</script>

<style scoped></style>
