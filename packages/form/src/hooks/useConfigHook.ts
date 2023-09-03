import { FormItemType } from '../types';

interface FormConfigAction {
  changed: Array<(item: FormItemType) => void>;
}

const action: FormConfigAction = {
  changed: [],
};

export default function useConfigHook() {
  return {
    setValue: (item: FormItemType) => {
      action.changed.forEach(v => v(item));
    },
    onChanged(callback: (item: FormItemType) => void) {
      action.changed.push(callback);
    },
  };
}
