<template>
  <a-menu
    v-model::inline-collapsed="menuInlineCollapsed"
    v-model:openKeys="menuOpenKeys"
    v-model:selectedKeys="menuSelectedKeys"
    :items="menuList"
    :mode="mode"
    :theme="theme"
    class="youyo-menu"
    @click="onClick"
    @select="onSelect"
  >
  </a-menu>
</template>

<script lang="ts" name="youyo-menu" setup>
import './style/index.less';
import { computed, defineEmits, defineProps } from 'vue';
import type { MenuProps } from '../types';

export interface MenuEmits {
  (event: 'click', val: any): void;

  (event: 'select', val: any): void;

  (event: 'update:inlineCollapsed', val: boolean): void;

  (event: 'update:openKeys', val: string[]): void;

  (event: 'update:selectedKeys', val: string[]): void;
}

const emits = defineEmits<MenuEmits>();
const props = defineProps<MenuProps>();

const menuInlineCollapsed = computed({
  get: () => {
    console.log(props.inlineCollapsed);
    return props.inlineCollapsed;
  },
  set: val => emits('update:inlineCollapsed', val),
});

const menuOpenKeys = computed({
  get: () => props.openKeys,
  set: keys => emits('update:openKeys', keys),
});

const menuSelectedKeys = computed({
  get: () => props.selectedKeys,
  set: keys => emits('update:selectedKeys', keys),
});

function onClick(menu: any) {
  emits('click', menu);
}

function onSelect(menu: any) {
  emits('select', menu);
}
</script>

<style scoped></style>
