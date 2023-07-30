import { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router';
import { TabRoute } from '../../types';

/**
 * 根据 route 创建 TabRoute
 * @param route 路由
 */
export function getTabRouteByRoute(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): TabRoute {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;

  return {
    name: route.name,
    path: fullPath,
    meta: route.meta,
  } as TabRoute;
}

/**
 * 判断路由是否有fullPath属性
 * @param route 路由
 */
export function hasFullPath(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): route is RouteLocationNormalizedLoaded {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath);
}

/**
 * 是否存在
 * @param tabs 缓存的 tabs
 * @param fullPath 路径
 */
export function isInTabs(tabs: Array<TabRoute>, fullPath: string): boolean {
  const tabRoute = tabs.find(tab => tab.path === fullPath);
  return Boolean(tabRoute);
}
