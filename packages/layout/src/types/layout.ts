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
