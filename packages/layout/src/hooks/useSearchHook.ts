import { reactive } from 'vue';

export type SearchType = {
  searchList: SearchItemType[];
};

export type SearchItemType = {
  label: string;
  value: string;
};

export default function useSearchHook(searchList: SearchItemType[]) {
  const search = reactive<SearchType>({
    searchList: searchList,
  });

  return {
    search,
  };
}
