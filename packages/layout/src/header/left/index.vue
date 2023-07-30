<template>
  <div class="header-left-content">
    <global-logo class="logo" v-if="logoVisible" :show-title="true" />
    <global-menu class="menu" v-if="menuVisible" :menu-list="routeStore.menuList" :selected-keys="routeStore.activeMenus" theme="light" :inline-collapsed="false" model="horizontal" />
    <global-menu-nav v-if="menuNavVisible" :active-menu="routeStore.rootMenu" :menu-list="routeStore.menuList" :model="'inline'" @menu-click="onMenuClick" />
    <menu-fold v-if="foldVisible" />
    <menu-breadcrumb v-if="breadcrumbVisible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouteStore, useThemeStore } from '../../store';
import MenuBreadcrumb from './breadcrumb/index.vue';
import MenuFold from './flod/index.vue';
import GlobalLogo from '../../logo/index.vue';
import GlobalMenu from '../../menu/index.vue';
import GlobalMenuNav from '../../menuNav/index.vue';
import './style/index.less';

export default defineComponent({
  name: 'left-content',
  components: { MenuBreadcrumb, MenuFold, GlobalLogo, GlobalMenu, GlobalMenuNav },
  setup() {
    const routeStore = useRouteStore();
    const themeStore = useThemeStore();

    return {
      logoVisible: computed(() => themeStore.navMode === 'vertical-mix' || themeStore.navMode === 'horizontal-mix'),
      menuVisible: computed(() => themeStore.navMode === 'vertical-mix'),
      menuNavVisible: computed(() => themeStore.navMode === 'horizontal-mix'),
      foldVisible: computed(() => themeStore.navMode === 'vertical'),
      breadcrumbVisible: computed(() => themeStore.navMode === 'vertical' || themeStore.navMode === 'horizontal'),
      routeStore,
      themeStore,
    };
  },
  methods: {
    onMenuClick(menu: Menu.MenuType) {
      this.themeStore.setSidebarCollapsible(menu.children.length === 0);
      this.routeStore.setRootMenu(menu);
      this.routeStore.setSubMenuList(menu.children);
    },
  },
});
</script>
