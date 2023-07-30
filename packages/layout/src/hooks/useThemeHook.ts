export type ThemeHookType = {
  theme: Theme.Setting;
  themeChange: (isDark: boolean) => Promise<{ default: string }>;
};

const theme: ThemeHookType = {
  theme: {
    darkTheme: false,
    configProvider: {
      componentSize: 'large',
      primaryColor: '#1890ff',
    },
    navMode: 'vertical',
    switchAnimation: 'fade',
    headerBgInverted: true,
    headerFixed: false,
    headerHeight: 64,
    tabsHeight: 50,
    sidebarBgInverted: false,
    sidebarCollapsible: false,
    sidebarMinWidth: 80,
    sidebarMaxWidth: 310,
    subSidebarFixed: false,
    subSidebarWidth: 200,
    subSidebarCollapsible: true,
    footerFixed: true,
    footerHeight: 50,
  },
};

export default function useThemeHook() {
  return {
    setup: ({ theme, themeChange }: ThemeHookType) => {
      theme.theme = theme;
      theme.themeChange = themeChange;
    },
    ...theme,
  };
}
