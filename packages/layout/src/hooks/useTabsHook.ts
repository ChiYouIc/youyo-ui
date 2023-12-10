import { reactive } from 'vue';

type TabsType = {
  key: string;
  tab: string;
  path: string;
};

export default function useTabsHook(defaultTab?: TabsType) {
  const tabProps = reactive<{
    tabList: TabsType[];
    tabKey: string;
    modifyTab: (key: string) => void;
  }>({
    tabList: [],
    tabKey: '',
    modifyTab,
  });

  if (defaultTab) {
    tabProps.tabList.push(defaultTab);
    tabProps.tabKey = defaultTab.key;
  }

  function addTab(t: TabsType) {
    if (!t) {
      console.warn('params is null');
      return;
    }

    const find = tabProps.tabList.find(tab => tab.key === t.key);
    if (find) {
      console.warn('multiple tab item');
      return;
    }

    tabProps.tabList.push(t);
  }

  function modifyTab(key: string) {
    if (!key) {
      console.warn('params is null');
      return;
    }

    const find = tabProps.tabList.find(tab => tab.key === key);
    if (!find) {
      console.warn('not found tab item');
      return;
    }

    tabProps.tabKey = find.key;
  }

  return {
    tabProps,
    addTab,
  };
}
