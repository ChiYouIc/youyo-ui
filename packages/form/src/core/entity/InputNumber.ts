import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { InputNumber as AntInputNumber, InputNumberProps } from 'ant-design-vue';
import { ComponentConstructorOptionType } from '../types';

class InputNumber extends AbstractComponent {
  private _value: string | number = 0;
  private _min: number = -1000;
  private _max: number = 1000;
  private _placeholder: string = '请输入数值';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init(_: Record<string, any>): void {}

  node(): VNode {
    return h<InputNumberProps>(AntInputNumber, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string | number) => (this._value = val),
      placeholder: this._placeholder,
      disabled: this.disabled,
      min: this._min,
      max: this._max,
    });
  }

  protected getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }

  get min(): number {
    return this._min;
  }

  set min(value: number) {
    this._min = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }
}

export default InputNumber;
