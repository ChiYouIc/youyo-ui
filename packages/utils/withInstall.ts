import type { App, Component, Plugin } from 'vue';

type NamedComponent = Component & { name?: string };
type SFCWithInstall<T extends Component> = T & Plugin;

const withInstall = <T extends NamedComponent>(comp: T, name?: string) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    //注册组件
    const componentName = name || comp.name || 'AnonymousComponent';
    app.component(componentName, comp);
  };
  return comp as SFCWithInstall<T>;
};

export { withInstall };
