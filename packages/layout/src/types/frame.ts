import { ItemType, MenuItemType } from './menu';
import { TabsType } from './tab';

export interface BaseFrameProps {
  basePath?: string;
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  tabList?: TabsType[];
  menuList: ItemType[];
  footerContent: string;
  avatarMenuList: {
    title: string;
    icon: string;
    action: () => void;
  }[];
  pageReload: (path: String) => void;
  pageChange: (path: String) => void;
}

export interface BaseFrameEmits {
  (event: 'tab-change', val: TabsType): void;
  (event: 'tab-add', val: TabsType): void;
  (event: 'tab-close', val: TabsType): void;
  (event: 'search-select', val: MenuItemType): void;
}
