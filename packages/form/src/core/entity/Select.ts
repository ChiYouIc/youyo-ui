import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Select as AntSelect, SelectProps } from 'ant-design-vue';

type SelectInitOption = AbstractComponentInitOption & {
  value: string | undefined;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
};

class Select extends AbstractComponent {
  public value: string | undefined = undefined;
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
