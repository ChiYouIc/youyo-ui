import { useRouteStore, useThemeStore } from '../modules';
import { onUnmounted, watch } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { loadTheme } from '../modules/theme/helper';
import useThemeHook from '../../hooks/useThemeHook';

/** 订阅主题 */
export default function subscribeTheme() {
  const themeStore = useThemeStore();
  const routeStore = useRouteStore();

  /** 暗黑主题 */
  const stopDarkTheme = watch(
    () => themeStore.darkTheme,
    isDark => {
      const { themeChange } = useThemeHook();
      themeChange(isDark).then(t => loadTheme(t.default, isDark));
      // isDark
      //   ? import('ant-design-vue/dist/antd.dark.less').then(dark => loadTheme(dark.default, isDark))
      //   : import('ant-design-vue/dist/antd.variable.less').then(variable => loadTheme(variable.default, isDark));
    },
    { immediate: true },
  );

  /** 主题颜色 */
  const stopThemeColor = watch(
    () => themeStore.configProvider.primaryColor,
    primaryColor => ConfigProvider.config({ theme: { primaryColor } }),
  );

  /** 布局 */
  const stopNavMode = watch(
    () => themeStore.navMode,
    navMode => {
      const { theme } = useThemeHook();
      switch (navMode) {
        case 'vertical':
          themeStore.setSidebarMinWidth(theme.sidebarMinWidth);
          themeStore.setSidebarCollapsible(false);
          themeStore.setSubSidebarFixed(false);
          themeStore.setSubSidebarCollapsible(true);
          break;
        case 'horizontal':
          themeStore.setSidebarMinWidth(theme.sidebarMinWidth);
          themeStore.setSidebarCollapsible(true);
          break;
        case 'vertical-mix':
          themeStore.setSidebarMinWidth(theme.sidebarMinWidth);
          themeStore.setSubSidebarCollapsible(true);
          themeStore.setSidebarCollapsible(false);
          break;
        case 'horizontal-mix':
          themeStore.setSidebarMinWidth(0);
          themeStore.setSubSidebarCollapsible(true);
          console.log(routeStore.rootMenu.children.length);
          themeStore.setSidebarCollapsible(routeStore.rootMenu.children.length === 0);
          break;
      }
    },
  );

  onUnmounted(() => {
    stopDarkTheme();
    stopThemeColor();
    stopNavMode();
  });
}
