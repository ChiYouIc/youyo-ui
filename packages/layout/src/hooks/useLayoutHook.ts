import { reactive } from 'vue';

export type LayoutType = {
  sidebar: LayoutSidebarType;
  header: LayoutHeaderType;
  tabs: LayoutTabsType;
  footer: LayoutFooterType;
};

export type LayoutSidebarType = {
  minWidth: number;
  maxWidth: number;
  collapsible: boolean;
};
export type LayoutHeaderType = {
  height: number;
  isFixed: boolean;
};
export type LayoutTabsType = {
  height: number;
  top: number;
  isFixed: boolean;
};
export type LayoutFooterType = {
  height: number;
  isFixed: boolean;
};

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
