<template>
  <div :id="id" class="fence" :style="gridStyle" :aria-label="`栅栏布局，${row} 行 ${col} 列`">
    <div v-for="(cell, index) in cells" :key="index" class="fence-cell">
      <span class="fence-cell__position">R{{ indexToRow(index) }} · C{{ indexToCol(index) }}</span>
      <draggable class="fence-cell__dropzone" data-role="fence" item-key="id" group="design" tag="ul" :fence-id="index" :list="cell" :move="onMove">
        <template #item="{ element }">
          <draggable-item :element="element" />
        </template>
      </draggable>
      <span v-if="cell.length === 0" class="fence-cell__empty">拖入组件</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/fence.less';
import Draggable from 'vuedraggable';
import { computed, defineProps } from 'vue';
import type { CSSProperties } from 'vue';
import type { ComponentModel } from '../core/types';
import DraggableItem from '../design/draggableItem.vue';
import useDraggableHook from '../hooks/useDraggableHook';

interface FenceProps {
  id: string;
  row: number;
  col: number;
  list: Array<Array<ComponentModel>>;
}

const props = defineProps<FenceProps>();
const cells = computed(() => props.list.slice(0, props.row * props.col));
const gridStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${props.col}, minmax(0, 1fr))`,
}));

function indexToRow(index: number): string {
  return String(Math.floor(index / props.col) + 1).padStart(2, '0');
}

function indexToCol(index: number): string {
  return String((index % props.col) + 1).padStart(2, '0');
}

function onMove(obj: any): boolean {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}
</script>

<style scoped></style>
