import { defineStore } from 'pinia';
import { nextTick } from 'vue';

type AppStoreType = {
  appName: string;
  appLogoImg: string;
  /** 配置栏 */
  settingDrawerVisible: boolean;
  /** 重新加载 */
  reloadFlag: boolean;
};

export const useAppStore = defineStore('app-store', {
  state: (): AppStoreType => ({
    appName: '',
    appLogoImg: '',
    settingDrawerVisible: false,
    reloadFlag: true,
  }),
  actions: {
    initApp() {},
    openSettingDrawer() {
      this.settingDrawerVisible = true;
    },
    closeSettingDrawer() {
      this.settingDrawerVisible = false;
    },
    /** 切换抽屉可见状态 */
    toggleSettingDrawerVisible() {
      this.settingDrawerVisible = !this.settingDrawerVisible;
    },
    /** 重新加载页面 */
    async reloadPage(duration = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else {
        this.reloadFlag = true;
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
  },
});
