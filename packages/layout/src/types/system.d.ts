/** 枚举类型 */
declare namespace EnumType {
  /** 导航模式类型 */
  type NavModeType = keyof typeof import('./setting').NavModeEnum;

  /** 页面切换动画类型 */
  type SwitchAnimationType = keyof typeof import('./setting').SwitchAnimationEnum;

  /** 组件大小类型 */
  type ComponentSizeType = keyof typeof import('./setting').ComponentSizeEnum;
}

declare namespace Theme {
  interface Setting {
    /** 主题模式 */
    darkTheme: boolean;
    /** Ant design config provider */
    configProvider: ConfigProvider;
    /** 导航模式*/
    navMode: EnumType.NavModeType;
    /** 页面切换动画 */
    switchAnimation: EnumType.SwitchAnimationType;
    /** 页面头部背景色 */
    headerBgInverted: boolean;
    /** 页面头部固定 */
    headerFixed: boolean;
    /** 头部高度 */
    headerHeight: number;
    /** tabs高度 */
    tabsHeight: number;
    /** 侧边栏背景色 */
    sidebarBgInverted: boolean;
    /** 侧边栏最小宽度 */
    sidebarMinWidth: number;
    /** 侧边栏最大宽度 */
    sidebarMaxWidth: number;
    /** 小侧边栏固定 */
    subSidebarFixed: boolean;
    /** 小侧边栏宽度 */
    subSidebarWidth: number;
    /** 小侧边栏展开与否 */
    subSidebarCollapsible: boolean;
    /** 侧边栏展开与否 */
    sidebarCollapsible: boolean;
    /** 底部固定 */
    footerFixed: boolean;
    /** 底部高度 */
    footerHeight: number;
  }

  /** Ant design config provider */
  interface ConfigProvider {
    /** 组件大小 */
    componentSize: EnumType.ComponentSizeType;
    /** 主题颜色 */
    primaryColor: string;
  }

  /** 侧边栏 */
  interface Sidebar {}

  /** 头部 */
  interface Header {}

  /** 多页签 */
  interface Tab {}

  /** 底部 */
  interface Footer {
    fixed: boolean;
  }
}
