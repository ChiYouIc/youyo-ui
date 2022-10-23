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
