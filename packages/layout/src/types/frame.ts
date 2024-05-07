import { ItemType } from './menu';
import { Router } from 'vue-router';
import { TabsType } from './tab';

export interface BaseFrameProps {
  currentPath: string;
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
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
