import type { VNode } from 'vue';
export type ItemType = MenuItemType | SubMenuType | MenuDividerType | MenuItemGroupType;

export type ItemLabelType = VNode | string | number | boolean | null | undefined | void;

export type MenuDividerType = {
  type: 'divider';
};

export type MenuItemGroupType = {
  key: string | number;
  type: 'group';
  label: ItemLabelType;
  title: string;
  children: MenuItemType[];
};

export type SubMenuType = {
  key: string | number;
  title: string;
  label: ItemLabelType;
  children: ItemType[];
  icon?: VNode | ((item: MenuItemType) => VNode);
  disabled?: boolean;
  popupClassName?: string;
  popupOffset?: [number, number];
  onTitleClick?: ({ key, domEvent }) => void;
  theme?: 'light' | 'dark';
};

export type MenuItemType = {
  key: string | number;
  title: string;
  label: ItemLabelType;
  path: string;
  icon?: VNode | ((item: MenuItemType) => VNode);
  disabled?: boolean;
  danger?: boolean;
};

export interface MenuProps {
  theme?: 'light' | 'dark';
  mode?: 'vertical' | 'horizontal' | 'inline';
  menuList: ItemType[];
  openKeys: Array<string | number>;
  selectedKeys: Array<string | number>;
  inlineCollapsed: boolean;
}
