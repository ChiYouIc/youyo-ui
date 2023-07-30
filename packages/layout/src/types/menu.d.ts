declare namespace Menu {
  /** 路由 meta */
  interface MetaType {
    title: string;
    icon: string;
    keepAlive: boolean;
  }

  /** 自定义的路由类型 */
  interface MenuType {
    key: string;
    name: string;
    path: string;
    component: string;
    redirect?: string;
    meta: MetaType;
    isComponent: boolean;
    hidden: boolean;
    orderNum: number;
    children: Array<MenuType>;
  }

  /** 路由path，提供给全局搜索的对象 */
  interface RoutePath {
    title: string;
    path: string;
  }
}
