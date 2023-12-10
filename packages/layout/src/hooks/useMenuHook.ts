import { reactive } from 'vue';
import type { ItemType } from 'ant-design-vue';

export interface MenuType {
  menuList: ItemType[];
  openKeys: Array<string>;
  selectedKeys: Array<string>;
  inlineCollapsed: boolean;
  theme: 'light' | 'dark';
  model: 'vertical' | 'horizontal' | 'inline';
}

export interface MenuAction {
  modifyOpenKeys: (keys: string[]) => void;
  modifySelectKeys: (keys: string[]) => void;
}

export default function useMenuHook(
  menuList: ItemType[],
  openKeys: Array<string>,
  selectedKeys: Array<string>,
  inlineCollapsed: boolean,
  theme?: 'light' | 'dark',
  model?: 'vertical' | 'horizontal' | 'inline',
) {
  const menu = reactive<MenuType & MenuAction>({
    menuList: menuList,
    openKeys: openKeys,
    selectedKeys: selectedKeys,
    inlineCollapsed: inlineCollapsed,
    theme: theme || 'light',
    model: model || 'vertical',
    modifyOpenKeys,
    modifySelectKeys,
  });

  function modifyOpenKeys(keys: string[]) {
    menu.openKeys = keys;
  }
  function modifySelectKeys(keys: string[]) {
    menu.selectedKeys = keys;
  }

  const switchInlineCollapsed = () => (menu.inlineCollapsed = !menu.inlineCollapsed);

  return { menu, switchInlineCollapsed };
}
