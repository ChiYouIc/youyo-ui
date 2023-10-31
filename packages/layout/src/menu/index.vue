<template>
  <a-menu class="youyo-menu" ref="menu" :mode="model" :openKeys="openKeys" :selectedKeys="selectedKeys" :theme="theme" :inline-collapsed="inlineCollapsed" @openChange="menuChange">
    <template v-for="menu in menuList" :key="menu.key">
      <template v-if="!menu.hidden">
        <template v-if="menu.children.length === 0">
          <a-menu-item :key="menu.path" :title="menu.title">
            <template v-if="menu.icon" #icon>
              <!-- 使用动态组件渲染 icon -->
              <component :is="menu.icon" />
            </template>
            <span @click="menuClick(menu)">{{ menu.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="menu.key" :menu-click="menuClick" :menu-info="menu" />
        </template>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts" name="youyo-menu">
import './style/index.less';
import SubMenu from './subMenu.vue';

export interface MenuProps {
  menuList: MenuInfo[];
  openKeys: Array<string>;
  selectedKeys: Array<string>;
  inlineCollapsed: boolean;
  theme: 'light' | 'dark';
  model: 'vertical' | 'horizontal' | 'inline';
  menuChange: (oKeys: string[]) => void;
  menuClick: (item: MenuInfo) => void;
}

export interface MenuInfo {
  key: string;
  title: string;
  path: string;
  icon?: string;
  hidden: boolean;
  children: MenuInfo[];
}

defineProps<MenuProps>();
</script>

<style scoped></style>
