<template>
  <a-menu class="youyo-menu" ref="menu" :mode="model" :openKeys="openKeys" :selectedKeys="selectedKeys" :theme="theme" :inline-collapsed="inlineCollapsed" @openChange="menuChange">
    <template v-for="menu in menuList" :key="menu.key">
      <template v-if="!menu.hidden">
        <template v-if="menu.children.length === 0">
          <a-menu-item :key="menu.path" :title="menu.title">
            <template #icon>
              <!-- 使用动态组件渲染 icon -->
              <component :is="menu.icon" />
            </template>
            <span @click="menuClick(menu)">{{ menu.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="menu.key" :menu-info="menu" />
        </template>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts" name="youyo-menu">
import './style/index.less';
import SubMenu from './subMenu.vue';
import useMenuHook from '../hooks/useMenuHook';
const { menuList, openKeys, selectedKeys, theme, model, inlineCollapsed, menuChange, menuClick } = useMenuHook();
console.log(menuList);
</script>

<style scoped></style>
