import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Select as AntSelect, SelectProps } from 'ant-design-vue';

type SelectInitOption = AbstractComponentInitOption<string> & {
  placeholder: string;
  options: Array<{ label: string; value: string }>;
};

class Select extends AbstractComponent<string> {
  public placeholder: string = '';
  public options: Array<{ label: string; value: string }> = [];

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init({ value, placeholder, options }: SelectInitOption): void {
    this.value = value;
    this.placeholder = placeholder;
    this.options = options;
  }

  node(): VNode {
    return h<SelectProps>(AntSelect, {
      id: this.id,
      value: this.value,
      'onUpdate:value': (val: string) => (this.value = val),
      placeholder: this.placeholder,
      disabled: this.disabled,
      options: this.options,
      style: { minWidth: '200px' },
    });
  }
}

export default Select;
