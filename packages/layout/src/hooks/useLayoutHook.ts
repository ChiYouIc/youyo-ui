import { reactive } from 'vue';
import { LayoutFooterType, LayoutHeaderType, LayoutSidebarType, LayoutTabsType, LayoutType } from '../types/layout';

export default function useLayoutHook(sidebar?: LayoutSidebarType, header?: LayoutHeaderType, tabs?: LayoutTabsType, footer?: LayoutFooterType) {
  const layout = reactive<LayoutType>({
    sidebar: sidebar || {
      minWidth: 80,
      maxWidth: 310,
      collapsible: false,
    },
    header: header || {
      height: 64,
      isFixed: true,
    },
    tabs: tabs || {
      height: 40,
      top: 0,
      isFixed: true,
    },
    footer: footer || {
      height: 50,
      isFixed: true,
    },
  });

  return {
    layout,
    switchCollapsible: () => {
      layout.sidebar.collapsible = !layout.sidebar.collapsible;
    },
  };
}
