import storage from 'store';
import { defineStore } from 'pinia';
import useMessageHook from '../../../hooks/useMessageHook';
import useRouteHook from '../../../hooks/useRouteHook';
import { findSubmenuKeys, menuToRootPath, parentMenuListByPath } from './helper';
import { RouteLocationNormalized } from 'vue-router';
import { MenuBreadcrumb } from '../../types';
import { useI18nStore } from '../i18n';

const { loadingMsg } = useMessageHook();
const { homePath, rootRoute, staticMenu, asyncRoute, dynamicRoute, hasNecessaryRoute } = useRouteHook();

type RouteStateType = {
  /** 所有菜单 */
  menuList: Array<Menu.MenuType>;
  /** 当前活动菜单 */
  activeMenus: string[];
  /** 当前活动的子菜单 */
  activeSubMenus: string[];
  /** 当前菜单面包屑导航栏 */
  menuBreadcrumb: Array<MenuBreadcrumb>;
  subMenuList: Array<Menu.MenuType>;
  /** 当前活动菜单的根菜单 */
  rootMenu: Menu.MenuType;
};

export const useRouteStore = defineStore('route-store', {
  state: (): RouteStateType => ({
    menuList: staticMenu,
    activeMenus: [],
    rootMenu: storage.get('rootMenu', rootRoute),
    activeSubMenus: [],
    menuBreadcrumb: [],
    subMenuList: storage.get('rootMenu', rootRoute).children,
  }),
  getters: {
    routePathList(state) {
      return menuToRootPath(state.menuList);
    },
  },
  actions: {
    /** 加载动态路由 */
    async loadingDynamicRoute() {
      const i18nStore = useI18nStore();
      const hidden = loadingMsg(i18nStore.i18nRender('sidebar.list.loading'), 0);
      await asyncRoute().then(list => {
        this.menuList.push(...list);
        dynamicRoute(list);
      });
      hidden();
    },
    /** 是否存在路由 */
    hasNecessaryRoute(to: RouteLocationNormalized): boolean {
      return hasNecessaryRoute(to);
    },
    /** 设置正在活动的菜单 */
    setActiveMenuKeys(fullPath: string) {
      this.activeMenus = [fullPath];
      for (let i = 0; i < this.menuList.length; i++) {
        const keys = findSubmenuKeys(this.menuList[i], fullPath);
        if (keys.length > 0) {
          this.setActiveSubMenus(keys);
        }
      }
    },
    /** 设置正在活动的子菜单 */
    setActiveSubMenus(keys: string[]) {
      this.activeSubMenus = keys;
    },
    /** 设置当前 */
    setMenuBreadcrumb(fullPath: string) {
      this.menuBreadcrumb = [];

      if (fullPath === homePath) {
        return;
      }

      for (let i = 0; i < this.menuList.length; i++) {
        const keys = parentMenuListByPath(this.menuList[i], fullPath);
        if (keys.length > 0) {
          this.menuBreadcrumb = keys;
          break;
        }
      }
    },
    /** 根菜单 */
    setRootMenu(root: Menu.MenuType) {
      this.rootMenu = root;
      storage.set('rootMenu', root);
    },
    /** 子菜单 */
    setSubMenuList(list: Array<Menu.MenuType>) {
      this.subMenuList = list;
    },
  },
});
