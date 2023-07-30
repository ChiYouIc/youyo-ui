import { defineStore } from 'pinia';
import storage from 'store';
import useMessageHook from '../../../hooks/useMessageHook';
import useLocaleHook from '../../../hooks/useLocaleHook';

const { loadingMsg } = useMessageHook();
const { defaultLocale, asyncLocale, i18n } = useLocaleHook();

type I18nStoreType = {
  locale: string;
};

export const useI18nStore = defineStore('i18n-store', {
  state: (): I18nStoreType => ({
    locale: storage.get('locale', defaultLocale),
  }),
  actions: {
    async loadDynamicI18n() {
      const hidden = loadingMsg(this.i18nRender('i18n.list.loading'));
      // 重新加载
      await asyncLocale();
      hidden();
    },
    /** 设置地区 */
    async setLocale(locale: string) {
      if (i18n.global.locale === locale) {
        return;
      }

      this.locale = locale;
      i18n.global.locale = locale;
      document.querySelector('html')?.setAttribute('locale', locale);
      storage.set('locale', locale);

      // 加载国际化
      await this.loadDynamicI18n();
    },
    i18nRender(key: string): string {
      return i18n.global.t(key);
    },
  },
});
