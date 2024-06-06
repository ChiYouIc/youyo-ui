export type TabsType = {
  key: string | number;
  tab: string;
  path: string;
};

export interface TabsProps {
  tabList: TabsType[];
  tabKey: string | number;
}

export interface TabsEmits {
  (event: 'update:tabKey', key: string | number): void;

  (event: 'update:tabList', tabList: TabsType[]): void;

  (event: 'redo', tab: TabsType): void;

  (event: 'close', tab: TabsType, index: number): void;

  (event: 'change', val: string | number): void;
}
