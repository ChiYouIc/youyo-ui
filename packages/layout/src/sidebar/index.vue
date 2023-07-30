<template>
  <template v-if="themeStore.navMode !== 'horizontal-mix'">
    <youyo-logo class="sidebar-logo" :show-title="!themeStore.sidebarCollapsible" />
    <div class="sidebar-menu">
      <youyo-menu-nav v-if="themeStore.navMode === 'horizontal'" :active-menu="routeStore.rootMenu" :menu-list="routeStore.menuList" :model="'vertical'" @menu-click="onMenuClick" />
      <youyo-menu
        v-else
        class="menu"
        :open-keys="routeStore.activeSubMenus"
        :selected-keys="routeStore.activeMenus"
        :menu-list="routeStore.menuList"
        :inline-collapsed="themeStore.sidebarCollapsible"
        :theme="!themeStore.sidebarBgInverted ? 'light' : 'dark'"
        :model="'inline'"
        @open-change="onOpenChange"
      />
    </div>
  </template>
  <template v-else>
    <youyo-menu
      class="menu"
      :open-keys="routeStore.activeSubMenus"
      :selected-keys="routeStore.activeMenus"
      :menu-list="routeStore.subMenuList"
      :inline-collapsed="themeStore.sidebarCollapsible"
      :theme="!themeStore.sidebarBgInverted ? 'light' : 'dark'"
      :model="'inline'"
      @open-change="onOpenChange"
    />
  </template>
</template>

<script lang="ts">
import YouyoMenu from '../menu/index.vue';
import YouyoMenuNav from '../menuNav/index.vue';
import YouyoLogo from '../logo/index.vue';
import './style/index.less';
import { useRouteStore, useThemeStore } from '../store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'youyo-sidebar',
  components: { YouyoMenu, YouyoMenuNav, YouyoLogo },
  setup() {
    const themeStore = useThemeStore();
    const routeStore = useRouteStore();

    function onOpenChange(oKeys: string[]) {
      if (oKeys.length === 0) {
        return;
      }

      // 获取到新打开的菜单
      const latestOpenKey = oKeys[oKeys.length - 1];
      if (latestOpenKey) {
        routeStore.setActiveSubMenus([latestOpenKey]);
      }
    }

    function onMenuClick(menu: Menu.MenuType) {
      routeStore.setRootMenu(menu);
      routeStore.setSubMenuList(menu.children);
      themeStore.setSubSidebarCollapsible(!(menu.children.length > 0));
    }

    return {
      themeStore,
      routeStore,
      onOpenChange,
      onMenuClick,
    };
  },
});
</script>

<style lang="less" scoped></style>
