import { reactive, toRefs } from 'vue';

export interface Search {
  searchList: SearchItemType[];
  /**
   * 当搜索值被选中后的动作
   * @param val 被选中的值
   */
  action: (val: string) => void;
}

export type SearchItemType = {
  label: string;
  value: string;
};

const search = reactive<SearchType>({
  searchList: [],
  action: (val: string) => console.log(val),
});

/**
 * 搜索过滤
 * @param val
 */
function filter(val: string): SearchItemType[] {
  if (!val) {
    return [];
  }
  return search.searchList.filter(v => v.label.includes(val));
}

export default function useSearchHook() {
  return {
    ...toRefs(search),
    setupSearch: (param: Search) => {
      search.searchList = param.searchList;
      search.action = param.action;
    },
    filter,
  };
}
