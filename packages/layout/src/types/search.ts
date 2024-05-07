export type SearchItemType = {
  label: string;
  value: string | number;
  path: string;
};

export interface SearchProps {
  searchList: SearchItemType[];
}
