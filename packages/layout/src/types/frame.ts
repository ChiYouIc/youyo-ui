import { ItemType } from './menu';
import { TabsType } from './tab';

export interface BaseFrameProps {
  basePath?: string;
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  tabList?: TabsType[];
  menuList: ItemType[];
  homeKey: string | number;
  footerContent: string;
  avatarMenuList: {
    title: string;
    icon: string;
    action: () => void;
  }[];
  pageReload: (path: string) => void;
  pageChange: (path: string) => void;
}

export interface BaseFrameEmits {}
