<template>
  <div class="option-interface">
    <a-divider>界面功能</a-divider>
    <div class="mb10 space-between">
      <span>头部反转色</span>
      <a-switch :disabled="themeStore.darkTheme" :checked="themeStore.headerBgInverted" @change="themeStore.setHeaderBgInverted" />
    </div>
    <div class="mb10 space-between">
      <span>侧边栏反转色</span>
      <a-switch :disabled="themeStore.darkTheme" :checked="themeStore.sidebarBgInverted" @change="themeStore.setSidebarBgInverted" />
    </div>
    <div class="mb10 space-between">
      <span>固定头部和多页签</span>
      <a-switch :checked="themeStore.headerFixed" @change="themeStore.setHeaderFixed" />
    </div>
    <div class="mb10 space-between">
      <span>固定底部</span>
      <a-switch :checked="themeStore.footerFixed" @change="themeStore.setFooterFixed" />
    </div>
  </div>
</template>

<script lang="ts" name="OptionInterface" setup>
import { useThemeStore } from '../../store';
import '../style/optionInterface.less';

const themeStore = useThemeStore();
</script>
