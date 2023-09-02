import { reactive, toRefs } from 'vue';

export interface Menu {
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
  icon: string;
  hidden: boolean;
  children: MenuItemType[];
};

export interface MenuAction {
  menuChange: (oKeys: string[]) => void;
  menuClick: (item: MenuItemType) => void;
}

const menu = reactive<Menu>({
  menuList: [],
  openKeys: [],
  selectedKeys: [],
  inlineCollapsed: true,
  theme: 'light',
  model: 'vertical',
});

const action: MenuAction = {
  menuChange: (oKeys: string[]) => console.log(oKeys),
  menuClick: (item: MenuItemType) => console.log(item),
};

export default function useMenuHook() {
  return {
    menu,
    ...toRefs(menu),
    setupMenu: (param: Menu, actionParam?: MenuAction) => {
      menu.menuList = param.menuList;
      menu.openKeys = param.openKeys;
      menu.selectedKeys = param.selectedKeys;
      menu.inlineCollapsed = param.inlineCollapsed;
      menu.theme = param.theme;
      menu.model = param.model;

      if (actionParam !== undefined) {
        action.menuChange = actionParam?.menuChange;
        action.menuClick = actionParam?.menuClick;
      }
    },
    menuChange(oKeys: string[]) {
      action.menuChange(oKeys);
    },
    menuClick(item: MenuItemType) {
      action.menuClick(item);
    },
    switchInlineCollapsed() {
      menu.inlineCollapsed = !menu.inlineCollapsed;
    },
  };
}
