/** 头部多页签 */
export interface TabRoute extends Pick<Menu.MenuType, 'name' | 'path' | 'meta'> {}

/** 菜单面包屑导航 */
export interface MenuBreadcrumb extends Pick<Menu.MenuType, 'name' | 'path' | 'meta'> {}
