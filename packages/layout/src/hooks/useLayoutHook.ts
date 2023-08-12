import { reactive, toRefs } from 'vue';

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

const layout = reactive<LayoutType>({
  sidebar: {
    minWidth: 80,
    maxWidth: 310,
    collapsible: false,
  },
  header: {
    height: 64,
    isFixed: true,
  },
  tabs: {
    height: 40,
    top: 10,
    isFixed: true,
  },
  footer: {
    height: 50,
    isFixed: true,
  },
});

export default function useLayoutHook() {
  return {
    setup: (param: LayoutType) => {
      layout.sidebar = param.sidebar;
      layout.header = param.header;
      layout.tab = param.tab;
      layout.footer = param.footer;
    },
    layout,
    ...toRefs(layout),
    switchCollapsible: () => {
      layout.sidebar.collapsible = !layout.sidebar.collapsible;
    },
  };
}
