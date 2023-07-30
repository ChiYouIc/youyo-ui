import { defineStore } from 'pinia';
import useThemeHook from '../../../hooks/useThemeHook';

type ThemeStore = Theme.Setting;
const { theme } = useThemeHook();
export const useThemeStore = defineStore('theme-store', {
  state: (): ThemeStore => theme,
  getters: {
    /** 侧边栏样式 */
    sidebarStyle(state) {
      return {
        position: 'fixed',
        width: state.sidebarCollapsible ? '80px' : '310px',
        left: '0',
        top: '0',
        bottom: '0',
        overflow: 'auto',
        zIndex: 3,
      };
    },
  },
  actions: {
    /** 设置 darkTheme */
    setDarkTheme(f: boolean) {
      this.darkTheme = f;
      // 去除头部背景色
      this.setHeaderBgInverted(!f);
      // 去除侧边栏背景色
      // this.setSidebarBgInverted(!f);
    },
    /** 设置 antd 组件大小 */
    setComponentSize(size: EnumType.ComponentSizeType) {
      this.configProvider.componentSize = size;
    },
    /** 设置 primaryColor */
    setPrimaryColor(color: string) {
      this.configProvider.primaryColor = color;
    },
    /** 设置 primaryMode */
    setPrimaryMode(mode: EnumType.NavModeType) {
      this.navMode = mode;
    },
    /** 设置过度动画 */
    setSwitchAnimation(type: EnumType.SwitchAnimationType) {
      this.switchAnimation = type;
    },
    /** 设置页面头部背景色 */
    setHeaderBgInverted(inverted: boolean) {
      this.headerBgInverted = inverted;
    },
    /** 设置页面头部固定 */
    setHeaderFixed(fixed: boolean) {
      this.headerFixed = fixed;
    },
    /** 设置侧边栏背景色 */
    setSidebarBgInverted(inverted: boolean) {
      this.sidebarBgInverted = inverted;
    },
    /** 设置侧边栏展开与否 */
    setSidebarCollapsible(collapsible: boolean) {
      this.sidebarCollapsible = collapsible;
    },
    setSidebarMinWidth(width: number) {
      this.sidebarMinWidth = width;
    },
    /** 设置小侧边栏宽度 */
    setSubSidebarWidth(width: number) {
      this.subSidebarWidth = width;
    },
    /** 设置小侧边栏是否固定 */
    setSubSidebarFixed(fixed: boolean) {
      this.subSidebarFixed = fixed;
    },
    /** 设置侧边栏展开与否 */
    setSubSidebarCollapsible(collapsible: boolean) {
      this.subSidebarCollapsible = collapsible;
      if (collapsible) {
        this.subSidebarFixed = false;
      }
    },
    /** 设置底部固定 */
    setFooterFixed(fixed: boolean) {
      this.footerFixed = fixed;
    },
  },
});
