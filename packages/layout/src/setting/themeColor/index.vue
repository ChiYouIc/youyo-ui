<template>
  <div class="setting-drawer-theme-color">
    <a-divider>主题颜色</a-divider>
    <ul class="color">
      <li v-for="c in colorList" :key="c" :style="{ backgroundColor: c }" @click="themeStore.setPrimaryColor(c)">
        <check-outlined v-if="themeStore.configProvider.primaryColor === c" style="color: #ffffff" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" name="ThemeColor" setup>
import { useThemeStore } from '../../store';
import '../style/themeColor.less';

const themeStore = useThemeStore();

const colorList = [
  '#1890ff',
  '#409EFF',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#34C759',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#78DEC7',
  '#e53935',
  '#d81b60',
  '#f4511e',
  '#fb8c00',
  '#ffb300',
  '#fdd835',
  '#6d4c41',
  '#546e7a',
];
</script>
