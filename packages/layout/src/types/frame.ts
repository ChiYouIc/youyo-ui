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
  footerContent: string;
  avatarMenuList: {
    title: string;
    icon: string;
    action: () => void;
  }[];
  pageReload: (path: String) => void;
  pageChange: (path: String) => void;
}

export interface BaseFrameEmits {}
