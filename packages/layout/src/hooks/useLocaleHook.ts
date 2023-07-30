import { createI18n } from 'vue-i18n';
import { App } from 'vue';

export type LocaleHook = {
  list: LocaleItem[];
  defaultLocale: string;
  asyncLocale: () => void;
  message: Record<string, Record<string, string>>;
};

export type LocaleItem = {
  key: string;
  title: string;
};

const locale: LocaleHook = {
  list: [],
  defaultLocale: '',
  asyncLocale: () => {
    throw new Error('locale hooks not init');
  },
  message: {},
};

const i18n = createI18n({
  silentFallbackWarn: true,
});

/**
 * 使用 i18n 国际化配置
 * @param {App} app
 */
export function setupI18n(app: App) {
  app.use(i18n);
}

/**
 * 使用 locale
 * @param {LocaleHook} param
 */
function setup(param: LocaleHook) {
  locale.list = param.list;

  i18n.global.locale = param.defaultLocale;
  i18n.global.fallbackLocale = param.defaultLocale;
  i18n.global.setLocaleMessage(param.defaultLocale, locale.message[param.defaultLocale]);
}

export default function useLocaleHook() {
  return {
    setup,
    setupI18n,
    i18n,
    ...locale,
  };
}
