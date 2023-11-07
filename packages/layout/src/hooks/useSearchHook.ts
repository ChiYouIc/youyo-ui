import { reactive } from 'vue';
import { SearchAction, SearchItemType, SearchType } from '../types/search';

export default function useSearchHook(searchList: SearchItemType[], action?: SearchAction) {
  const search = reactive<SearchType & SearchAction>({
    searchList: searchList,
    checked(val: string) {
      console.log(val);
      action?.checked(val);
    },
  });

  return {
    search,
  };
}
