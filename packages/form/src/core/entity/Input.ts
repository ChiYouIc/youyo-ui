import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Input as AntInput, InputProps } from 'ant-design-vue';

type InputInitOption = AbstractComponentInitOption<string> & {
  placeholder: string;
  maxlength: number;
};

class Input extends AbstractComponent<string> {
  public placeholder: string = '请输入内容';
  public maxlength: number = 500;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init({ value, placeholder, maxlength }: InputInitOption): void {
    this.value = value;
    this.placeholder = placeholder;
    this.maxlength = maxlength;
  }

  node(): VNode {
    return h<InputProps>(AntInput, {
      id: this.id,
      value: this.value,
      'onUpdate:value': (val: string) => (this.value = val),
      placeholder: this.placeholder,
      disabled: this.disabled,
      maxlength: this.maxlength,
      allowClear: true,
      style: { width: '200px' },
    });
  }
}

export default Input;
