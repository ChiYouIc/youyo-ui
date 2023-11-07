export interface MenuType {
  menuList: MenuItemType[];
  openKeys: Array<string>;
  selectedKeys: Array<string>;
  inlineCollapsed: boolean;
  theme: 'light' | 'dark';
  model: 'vertical' | 'horizontal' | 'inline';
}

export type MenuItemType = {
  key: string;
  title: string;
  path: string;
  icon?: string;
  hidden: boolean;
  children: MenuItemType[];
};

export interface MenuAction {
  menuChange: (oKeys: string[]) => void;
  menuClick: (item: MenuItemType) => void;
}
