<template>
  <div class="setting-drawer-theme-schema">
    <a-divider>主题模式</a-divider>
    <div class="space-between">
      <span>深色主题</span>
      <a-switch size="default" :checked="themeStore.darkTheme" @change="checked => themeStore.setDarkTheme(checked)">
        <template #checkedChildren>
          <check-outlined />
        </template>
        <template #unCheckedChildren>
          <close-outlined />
        </template>
      </a-switch>
    </div>
  </div>
</template>

<script lang="ts" name="ThemeSchema" setup>
import { useThemeStore } from '../../store';
import '../style/themeSchema.less';

const themeStore = useThemeStore();
</script>
