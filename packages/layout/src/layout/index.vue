<template>
  <div class="youyo-basic-layout">
    <div :class="sidebarClass" :style="sidebarStyle">
      <slot name="sidebar"></slot>
    </div>
    <header :class="headerClass" :style="headerStyle">
      <slot name="header"></slot>
    </header>
    <div :class="tabsClass" :style="tabsStyle">
      <slot name="tabs"></slot>
    </div>
    <main :class="contentClass" :style="contentStyle">
      <slot name="content"></slot>
    </main>
    <footer :class="footerClass" :style="footerStyle">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts" setup name="youyo-layout">
import './style/index.less';
import { computed, CSSProperties } from 'vue';

export interface LayoutProps {
  sidebar: {
    minWidth: number;
    maxWidth: number;
    collapsible: boolean;
  };
  header: {
    height: number;
    isFixed: boolean;
  };
  tabs: {
    height: number;
    top: number;
    isFixed: boolean;
  };
  footer: {
    height: number;
    isFixed: boolean;
  };
}

const props = defineProps<LayoutProps>();

const sidebarStyle = computed(() => {
  let width = props.sidebar.collapsible ? `${props.sidebar.minWidth}px` : `${props.sidebar.maxWidth}px`;
  return {
    width,
    position: 'fixed',
    left: '0',
    top: '0',
    bottom: '0',
    zIndex: 10,
  } as CSSProperties;
});

const headerStyle = computed(() => {
  const header = props.header;
  return {
    width: header.isFixed ? '100%' : '',
    height: `${header.height}px`,
    zIndex: 8,
    position: header.isFixed ? 'fixed' : 'static',
    paddingLeft: paddingLeft(),
    paddingRight: '0',
  } as CSSProperties;
});

const tabsStyle = computed(() => {
  const tabs = props.tabs;
  const header = props.header;
  return {
    width: tabs.isFixed ? '100%' : '',
    height: `${tabs.height}px`,
    position: tabs.isFixed ? 'fixed' : 'static',
    paddingLeft: paddingLeft(),
    top: header.isFixed ? `${tabs.top + header.height}px` : `${tabs.top}px`,
    zIndex: 7,
  } as CSSProperties;
});

const contentStyle = computed(() => {
  const header = props.header;
  const tabs = props.tabs;
  const footer = props.footer;
  return {
    position: 'relative',
    paddingLeft: paddingLeft(),
    paddingTop: header.isFixed ? `${header.height + tabs.height + tabs.top}px` : '0',
    paddingBottom: footer.isFixed ? `${footer.height}px` : '',
  } as CSSProperties;
});

const footerStyle = computed(() => {
  const footer = props.footer;
  return {
    width: footer.isFixed ? '100%' : '',
    height: `${footer.height}px`,
    position: footer.isFixed ? 'fixed' : 'relative',
    paddingLeft: paddingLeft(),
    bottom: footer.isFixed ? '0' : '',
  } as CSSProperties;
});

function paddingLeft() {
  const sidebar = props.sidebar;
  return `${sidebar.collapsible ? sidebar.minWidth : sidebar.maxWidth}px`;
}

const sidebarClass = computed(() => ['youyo-global-sidebar', 'transition-200-ease-in-out']);
const headerClass = computed(() => ['youyo-global-header', 'box-shadow-bottom', 'transition-200-ease-in-out']);
const tabsClass = computed(() => ['youyo-global-tabs', 'transition-200-ease-in-out']);
const contentClass = computed(() => ['youyo-global-content', 'transition-200-ease-in-out']);
const footerClass = computed(() => ['youyo-global-footer', 'transition-200-ease-in-out']);
</script>
