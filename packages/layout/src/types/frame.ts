import { ItemType, MenuItemType } from './menu';
import { Router } from 'vue-router';
import { TabsType } from './tab';

export interface BaseFrameProps {
  currentPath: string;
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  tabList?: TabsType[];
  menuList: ItemType[];
  footerContent: string;
  router: Router;
  avatarMenuList: {
    title: string;
    icon: string;
    action: () => void;
  }[];
  pageReload: (val: TabsType) => void;
}

export interface BaseFrameEmits {
  (event: 'tab-click', val: TabsType): void;
  (event: 'tab-add', val: TabsType): void;
  (event: 'tab-close', val: TabsType): void;
  (event: 'search-select', val: MenuItemType): void;
}
