<template>
  <a-menu
    class="youyo-menu"
    ref="menu"
    :mode="model"
    v-model:openKeys="menuOpenKeys"
    v-model:selectedKeys="menuSelectedKeys"
    :theme="theme"
    :inline-collapsed="inlineCollapsed"
    :items="menuList"
    @click="onClick"
    @select="onSelect"
  >
  </a-menu>
</template>

<script setup lang="ts" name="youyo-menu">
import './style/index.less';
import { computed } from 'vue';
import type { ItemType } from 'ant-design-vue';

export interface MenuProps {
  menuList: ItemType[];
  openKeys: Array<string>;
  selectedKeys: Array<string>;
  inlineCollapsed: boolean;
  theme: 'light' | 'dark';
  model: 'vertical' | 'horizontal' | 'inline';
  modifyOpenKeys: (keys: string[]) => void;
  modifySelectKeys: (keys: string[]) => void;
}

export interface MenuEmits {
  (event: 'click', val: any): void;

  (event: 'select', val: any): void;
}

const emits = defineEmits<MenuEmits>();
const props = defineProps<MenuProps>();

const menuOpenKeys = computed({
  get: () => props.openKeys,
  set: keys => props.modifyOpenKeys(keys),
});

const menuSelectedKeys = computed({
  get: () => props.selectedKeys,
  set: keys => props.modifySelectKeys(keys),
});

function onClick(menu: any) {
  emits('click', menu);
}

function onSelect(menu: any) {
  emits('select', menu);
}
</script>

<style scoped></style>
