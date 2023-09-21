import AbstractComponent from '../core/AbstractComponent';

interface FormConfigAction {
  changed: Array<(item: AbstractComponent<any>) => void>;
}

const action: FormConfigAction = {
  changed: [],
};

export default function useConfigHook() {
  return {
    setValue: (item: AbstractComponent<any>) => {
      action.changed.forEach(v => v(item));
    },
    onChanged(callback: (item: AbstractComponent<any>) => void) {
      action.changed.push(callback);
    },
  };
}
