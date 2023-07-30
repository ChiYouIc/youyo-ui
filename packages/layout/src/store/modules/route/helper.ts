import { MenuBreadcrumb } from '../../types';
import { useI18nStore } from '../i18n';

/** 获取 fullPath 对应的菜单所有父级菜单 */
function parentMenuListByPath(menu: Menu.MenuType, fullPath: string): Array<MenuBreadcrumb> {
  let result: Array<MenuBreadcrumb> = [];
  const b = { name: menu.name, path: menu.path, meta: menu.meta };
  if (menu.path == fullPath) {
    result.push(b);
    return result;
  }

  for (const child of menu.children) {
    const res = parentMenuListByPath(child, fullPath);
    // res > 0 是表示已经找到了对应的路由，直接返回
    if (res.length > 0) {
      result = [b, ...res];
      return result;
    }
  }

  return result;
}

/** 菜单转 root path */
function menuToRootPath(menuList: Menu.MenuType[]): Menu.RoutePath[] {
  const i18nStore = useI18nStore();
  function find(root: Menu.MenuType, rootStr: string | null): Menu.RoutePath[] {
    rootStr = (rootStr === null ? '' : rootStr + '-') + i18nStore.i18nRender(root.meta.title!);

    if (root.children.length === 0) {
      return [{ title: rootStr, path: root.path }];
    }

    let rs: Menu.RoutePath[] = [];
    const children = root.children;
    for (let i = 0; i < children.length; i++) {
      rs = [...rs, ...find(children[i], rootStr)];
    }

    return rs;
  }
  let result: Menu.RoutePath[] = [];
  menuList.forEach(r => (result = [...result, ...find(r, null)]));
  return result;
}

/** 获取 submenu keys */
function findSubmenuKeys(menu: Menu.MenuType, fullPath: string): string[] {
  const keys: string[] = [];
  const children = menu.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].path === fullPath) {
      keys.push(menu.name);
      break;
    }
    keys.push(...findSubmenuKeys(children[i], fullPath));
  }
  return keys;
}

export { parentMenuListByPath, menuToRootPath, findSubmenuKeys };
