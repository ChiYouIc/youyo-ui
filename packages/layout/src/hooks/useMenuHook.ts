import { reactive } from 'vue';

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

export default function useMenuHook(
  menuList: MenuItemType[],
  openKeys: Array<string>,
  selectedKeys: Array<string>,
  inlineCollapsed: boolean,
  theme?: 'light' | 'dark',
  model?: 'vertical' | 'horizontal' | 'inline',
  action?: MenuAction,
) {
  const menu = reactive<MenuType & MenuAction>({
    menuList: menuList,
    openKeys: openKeys,
    selectedKeys: selectedKeys,
    inlineCollapsed: inlineCollapsed,
    theme: theme || 'light',
    model: model || 'vertical',
    menuChange(oKeys: string[]) {
      action?.menuChange(oKeys);
      console.log(oKeys);
    },
    menuClick(item: MenuItemType) {
      action?.menuClick(item);
      console.log(item);
    },
  });

  function switchInlineCollapsed() {
    menu.inlineCollapsed = !menu.inlineCollapsed;
  }
  return { menu, switchInlineCollapsed };
}
