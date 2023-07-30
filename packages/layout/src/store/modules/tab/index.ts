import storage from 'store';
import { defineStore } from 'pinia';
import { TabRoute } from '../../types';
import ArrayUtil from '@youyo-ui/utils/arrayUtil';
import { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router';
import { getTabRouteByRoute, isInTabs } from './util';
import useTabsHook from '../../../hooks/useTabsHook';

type TabStoreType = {
  activeTab: string;
  tabs: Array<TabRoute>;
};

export const useTabStore = defineStore('GlobalTab-store', {
  state: (): TabStoreType => ({
    activeTab: storage.get('activeTab', ''),
    tabs: storage.get('tabs', []),
  }),
  actions: {
    setActiveTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded) {
      const { allowList } = useTabsHook();
      if (allowList.includes(route.path)) {
        return;
      }
      const tab = getTabRouteByRoute(route);
      this.activeTab = tab.path;
      if (!isInTabs(this.tabs, tab.path)) {
        this.tabs.push(tab);
        storage.set('tabs', this.tabs);
      }
      storage.set('activeTab', tab);
    },
    /** 删除 fullPath 的 tabs */
    removeTab(fullPath: string) {
      this.tabs = ArrayUtil.remove(this.tabs, tab => tab.path === fullPath);
      storage.set('tabs', this.tabs);
    },
    /** 删除到最左端 */
    removeTabToLeft(fullPath: string) {
      const index = this.tabs.findIndex(tab => tab.path === fullPath);
      this.tabs = this.tabs.slice(index);
      storage.set('tabs', this.tabs);
    },
    /** 删除到最右端 */
    removeTabToRight(fullPath: string) {
      const index = this.tabs.findIndex(tab => tab.path === fullPath);
      this.tabs = this.tabs.slice(0, index + 1);
      storage.set('tabs', this.tabs);
    },
    /** 删除除 fullPath 的 tabs */
    removeOtherTab(fullPath: string) {
      const tab = this.tabs.find(tab => tab.path === fullPath);
      this.tabs = tab ? [tab] : [];
      storage.set('tabs', this.tabs);
    },
  },
});
