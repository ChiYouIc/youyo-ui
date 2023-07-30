import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;
const withInstall = <T>(comp: T, name?: string) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    //注册组件
    app.component(name || (comp as any).name, comp);
  };
  return comp as SFCWithInstall<T>;
};

export { withInstall };
