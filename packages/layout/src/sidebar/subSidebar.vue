<template>
  <div class="sub-sidebar" @mouseleave="onMouseLeve">
    <div class="sub-sidebar-logo">
      {{ appName }}
      <pushpin-outlined @click="onPushpin" :class="{ active: themeStore.subSidebarFixed }" />
    </div>
    <div>
      <youyo-menu :menu-list="routeStore.subMenuList" :inline-collapsed="false" :theme="'light'" :model="'inline'" />
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore, useRouteStore, useThemeStore } from '../store';
import YouyoMenu from '../menu/index.vue';
import './style/subSidebar.less';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'youyo-sub-sidebar',
  components: { YouyoMenu },
  setup() {
    const routeStore = useRouteStore();
    const themeStore = useThemeStore();
    const { appName } = useAppStore();

    function onPushpin() {
      themeStore.setSubSidebarFixed(!themeStore.subSidebarFixed);
    }

    function onMouseLeve() {
      if (!themeStore.subSidebarFixed) {
        themeStore.setSubSidebarCollapsible(true);
      }
    }

    return {
      routeStore,
      themeStore,
      appName,
      onPushpin,
      onMouseLeve,
    };
  },
});
</script>

<style lang="less" scoped></style>
