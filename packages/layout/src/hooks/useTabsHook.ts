export interface TabsHook {
  goPath: (path: string) => void;
  allowList: string[];
}

function notSetup(): void {
  throw new Error('tabs hooks not init');
}

const tabs: TabsHook = {
  goPath: () => notSetup(),
  allowList: [],
};

export default function useTabsHook() {
  return {
    setup: (param: TabsHook) => {
      tabs.goPath = param.goPath;
      tabs.allowList = param.allowList;
    },
    ...tabs,
  };
}
