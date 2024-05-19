import AbstractComponent from '../core/AbstractComponent';

interface FormConfigAction {
  changed: Array<(item: AbstractComponent) => void>;
}

const action: FormConfigAction = {
  changed: [],
};

export default function useConfigHook() {
  return {
    setValue: (item: AbstractComponent) => {
      action.changed.forEach(v => v(item));
    },
    onChanged(callback: (item: AbstractComponent) => void) {
      action.changed.push(callback);
    },
  };
}
