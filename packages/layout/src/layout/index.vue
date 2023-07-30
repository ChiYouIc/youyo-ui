<template>
  <div class="youyo-basic-layout">
    <div :class="sidebarClass" :style="sidebarStyle">
      <slot name="sidebar"></slot>
    </div>
    <div :class="subSidebarClass" :style="subSidebarStyle">
      <slot name="sub-sidebar"></slot>
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

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue';
import './style/index.less';

export default defineComponent({
  name: 'youyo-layout',
  props: {
    darkTheme: { type: Boolean, required: true },
    navMode: { type: String, required: true },
    headerFixed: { type: Boolean, required: true },
    headerHeight: { type: Number, required: true },
    tabsHeight: { type: Number, required: true },
    headerBgInverted: { type: Boolean, required: true },
    sidebarCollapsible: { type: Boolean, required: true },
    sidebarMinWidth: { type: Number, required: true },
    sidebarMaxWidth: { type: Number, required: true },
    subSidebarFixed: { type: Boolean, required: true },
    subSidebarWidth: { type: Number, required: true },
    subSidebarCollapsible: { type: Boolean, required: true },
    footerFixed: { type: Boolean, required: true },
    footerHeight: { type: Number, required: true },
  },
  setup(props) {
    // 左侧菜单模式
    // const isVertical = () => props.navMode === 'vertical';
    // 顶部菜单模式
    // const isHorizontal = () => props.navMode === 'horizontal';
    // 左侧菜单混合模式
    const isVerticalMix = () => props.navMode === 'vertical-mix';
    // 顶部菜单混合模式
    const isHorizontalMix = () => props.navMode === 'horizontal-mix';
    // 头部高度
    const headerAndTabsHeight = () => props.headerHeight + props.tabsHeight;

    const sidebarStyle = computed(() => {
      let width = props.sidebarCollapsible ? `${props.sidebarMinWidth}px` : `${props.sidebarMaxWidth}px`;
      if (isVerticalMix()) {
        width = '0';
      }
      return {
        width,
        position: 'fixed',
        left: '0',
        top: isHorizontalMix() ? props.headerHeight + 'px' : '0',
        bottom: '0',
        zIndex: 10,
      } as CSSProperties;
    });

    const subSidebarStyle = computed(() => {
      return {
        position: 'fixed',
        width: props.subSidebarCollapsible ? '0' : `${props.subSidebarWidth}px`,
        left: `${props.sidebarMinWidth}px`,
        zIndex: 9,
        bottom: '0',
      } as CSSProperties;
    });

    const headerStyle = computed(() => {
      return {
        width: '100%',
        height: `${props.headerHeight}px`,
        zIndex: 8,
        position: props.headerFixed ? 'fixed' : 'static',
        paddingLeft: headerPaddingLeft(),
        paddingRight: '0',
      } as CSSProperties;
    });

    const tabsStyle = computed(() => {
      return {
        position: props.headerFixed ? 'fixed' : 'static',
        paddingLeft: `${paddingLeft()}px`,
        top: props.headerFixed ? `${props.headerHeight}px` : '0',
        zIndex: 7,
      } as CSSProperties;
    });

    const contentStyle = computed(() => {
      return {
        position: 'relative',
        paddingLeft: `${paddingLeft()}px`,
        paddingTop: props.headerFixed ? `${headerAndTabsHeight()}px` : '0',
        paddingBottom: props.footerFixed ? `${props.footerHeight}px` : '0',
      } as CSSProperties;
    });

    const footerStyle = computed(() => {
      return {
        position: props.footerFixed ? 'fixed' : 'relative',
        paddingLeft: `${paddingLeft()}px`,
        bottom: props.footerFixed ? '0' : '',
        height: `${props.footerHeight}px`,
      } as CSSProperties;
    });

    function headerPaddingLeft() {
      let paddingLeft = props.sidebarCollapsible ? props.sidebarMinWidth : props.sidebarMaxWidth;
      if (isHorizontalMix() || isVerticalMix()) {
        paddingLeft = 0;
      }

      if (props.subSidebarFixed) {
        paddingLeft += props.subSidebarWidth;
      }

      return `${paddingLeft}px`;
    }

    function paddingLeft() {
      let paddingLeft = props.sidebarCollapsible ? props.sidebarMinWidth : props.sidebarMaxWidth;

      if (props.subSidebarFixed) {
        paddingLeft += props.subSidebarWidth;
      }

      if (isVerticalMix()) {
        paddingLeft = 0;
      }

      return paddingLeft;
    }
    return {
      sidebarClass: computed(() => ['youyo-global-sidebar', 'transition-200-ease-in-out', 'box-shadow-right', props.darkTheme ? 'black-bg' : 'white-bg']),
      subSidebarClass: computed(() => ['youyo-global-sub-sidebar', 'transition-200-ease-in-out', 'box-shadow-right', props.darkTheme ? 'black-bg' : 'white-bg']),
      headerClass: computed(() => ['youyo-global-header', 'box-shadow-bottom', 'transition-200-ease-in-out', props.darkTheme ? 'black-bg' : 'white-bg']),
      tabsClass: computed(() => ['youyo-global-tabs', 'transition-200-ease-in-out', props.darkTheme ? 'black-bg' : 'white-bg']),
      contentClass: computed(() => ['youyo-global-content', 'transition-200-ease-in-out', props.darkTheme ? 'black-bg' : 'white-bg']),
      footerClass: computed(() => ['youyo-global-footer', 'transition-200-ease-in-out', props.darkTheme ? 'black-bg' : 'white-bg']),
      sidebarStyle,
      subSidebarStyle,
      headerStyle,
      tabsStyle,
      contentStyle,
      footerStyle,
    };
  },
});
</script>
