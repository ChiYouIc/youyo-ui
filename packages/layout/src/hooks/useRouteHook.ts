import { RouteLocationNormalized } from 'vue-router';

export interface RouteHook {
  homePath: string;
  rootRoute: Menu.MenuType;
  staticMenu: Array<Menu.MenuType>;
  asyncRoute: () => Promise<Array<Menu.MenuType>>;
  dynamicRoute: (dynamicMenus: Menu.MenuType[]) => void;
  hasNecessaryRoute: (to: RouteLocationNormalized) => boolean;
}

const route: RouteHook = {
  homePath: '/home',
  rootRoute: [],
  staticMenu: [],
  asyncRoute: (): Promise<Array<Menu.MenuType>> => {
    throw new Error('route hook not init');
  },
  dynamicRoute: (): void => {
    throw new Error('route hook not init');
  },
  hasNecessaryRoute: (): boolean => {
    throw new Error('route hook not init');
  },
};

export default function useRouteHook() {
  return {
    setup: (param: RouteHook) => {
      route.homePath = param.homePath;
      route.rootRoute = param.rootRoute;
      route.staticMenu = param.staticMenu;
      route.asyncRoute = param.asyncRoute;
      route.dynamicRoute = param.dynamicRoute;
      route.hasNecessaryRoute = param.hasNecessaryRoute;
    },
    ...route,
  };
}
