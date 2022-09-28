import { ExtractPropTypes } from 'vue';
import { IElement } from 'happy-dom';

export const searchBarProps = {
  columns: {
    type: Number,
    default: () => 4,
  },
  labelWidth: {
    type: String,
    required: false,
    default: () => '48',
  },
  fold: {
    type: Boolean,
    required: false,
    default: () => true,
  },
};

export const searchBarItemProps = {
  label: {
    type: String,
    required: false,
    default: () => '',
  },
};

export type searchBarStateType = {
  unfold: boolean;
  itemList: Array<IElement>;
};

export type SearchBarProps = ExtractPropTypes<typeof searchBarProps>;
export type SearchBarItemProps = ExtractPropTypes<typeof searchBarItemProps>;
