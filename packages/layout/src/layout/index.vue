<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
        algorithm: theme.defaultConfig,
      },
    }"
  >
    <a-layout :has-sider="true" class="youyo-basic-layout">
      <a-layout-sider :collapsed="sidebarCollapsed" :width="width" :theme="sidebarTheme" :class="sidebarClass" :style="sidebarStyle">
        <slot name="sidebar"></slot>
      </a-layout-sider>
      <a-layout>
        <div :class="headerClass" :style="headerStyle">
          <slot name="header"></slot>
        </div>
        <div :class="tabsClass" :style="tabsStyle">
          <slot name="tabs"></slot>
        </div>
        <a-layout-content :class="contentClass" :style="contentStyle">
          <slot name="content"></slot>
        </a-layout-content>
        <a-layout-footer :class="footerClass" :style="footerStyle">
          <slot name="footer"></slot>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script lang="ts" setup name="youyo-layout">
import './style/index.less';
import { defineProps, computed, CSSProperties } from 'vue';
import { theme } from 'ant-design-vue';
import type { LayoutProps } from '../types';

const props = defineProps<LayoutProps>();

const width = computed(() => (props.sidebarCollapsed ? `${props.sidebarMinWidth}px` : `${props.sidebarMaxWidth}px`));
const sidebarStyle = computed(() => {
  return {
    position: 'fixed',
    left: '0',
    top: '0',
    bottom: '0',
    zIndex: 10,
  } as CSSProperties;
});

const headerStyle = computed(() => {
  return {
    width: '100%',
    height: `${props.headerHeight}px`,
    zIndex: 8,
    position: props.headerIsFixed ? 'fixed' : 'static',
    paddingLeft: paddingLeft(),
    paddingRight: '0',
    marginBottom: '10px',
  } as CSSProperties;
});

const tabsStyle = computed(() => {
  return {
    width: '100%',
    height: `${props.tabsHeight}px`,
    position: props.headerIsFixed ? 'fixed' : 'static',
    paddingLeft: paddingLeft(),
    top: props.headerIsFixed ? `${props.tabsTop + props.headerHeight}px` : `${props.tabsTop}px`,
    zIndex: 7,
  } as CSSProperties;
});

const contentStyle = computed(() => {
  return {
    position: props.headerIsFixed ? 'fixed' : 'static',
    width: '100%',
    height: '100%',
    paddingLeft: paddingLeft(),
    paddingTop: props.headerIsFixed ? `${props.headerHeight + props.tabsHeight + props.tabsTop}px` : '0',
    paddingBottom: props.footerIsFixed ? `${props.footerHeight}px` : '',
  } as CSSProperties;
});

const footerStyle = computed(() => {
  return {
    width: props.footerIsFixed ? '100%' : '',
    height: `${props.footerHeight}px`,
    position: props.footerIsFixed ? 'fixed' : 'relative',
    paddingLeft: paddingLeft(),
    bottom: props.footerIsFixed ? '0' : '',
  } as CSSProperties;
});

function paddingLeft() {
  return `${props.sidebarCollapsed ? props.sidebarMinWidth : props.sidebarMaxWidth}px`;
}

const sidebarClass = computed(() => ['youyo-global-sidebar', 'transition-200-ease-in-out']);
const headerClass = computed(() => ['youyo-global-header', 'box-shadow-bottom', 'transition-200-ease-in-out']);
const tabsClass = computed(() => ['youyo-global-tabs', 'transition-200-ease-in-out']);
const contentClass = computed(() => ['youyo-global-content', 'transition-200-ease-in-out']);
const footerClass = computed(() => ['youyo-global-footer', 'transition-200-ease-in-out']);
</script>
