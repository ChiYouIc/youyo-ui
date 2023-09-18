import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { InputNumber as AntInputNumber, InputNumberProps } from 'ant-design-vue';

type InputNumberInitOption = AbstractComponentInitOption & {};

class InputNumber extends AbstractComponent {
  public value: number | undefined = undefined;
  public min: number = -1000;
  public max: number = 1000;
  public placeholder: string = '请输入数值';

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: InputNumberInitOption): void {}

  node(): VNode {
    return h<InputNumberProps>(AntInputNumber, {
      value: this.value,
      'onUpdate:value': (val: number) => (this.value = val),
      placeholder: this.placeholder,
      disabled: this.disabled,
      min: this.min,
      max: this.max,
    });
  }
}

export default InputNumber;
