export type TabsType = {
  key: string | number;
  tab: string;
  path: string;
};

export interface TabsProps {
  tabList: TabsType[];
  tabKey: string | number;
}
