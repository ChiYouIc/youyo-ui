export type SearchType = {
  searchList: SearchItemType[];
};

export type SearchItemType = {
  label: string;
  value: string;
  path: string;
};

export interface SearchAction {
  /**
   * 当搜索值被选中后的动作
   * @param val 被选中的值
   */
  checked: (val: string) => void;
}
