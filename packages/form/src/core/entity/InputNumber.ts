import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CInputNumber } from '../../components';

class InputNumber extends AbstractComponent {
  private _value: string | number = 0;
  private _min: number = -1000;
  private _max: number = 1000;
  private _placeholder: string = '请输入数值';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
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

  init({ value, max, min, placeholder }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._max = max;
    this._min = min;
  }

  node(): VNode {
    return h(CInputNumber, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string | number) => (this._value = val),
      placeholder: this._placeholder,
      disabled: this.disabled,
      min: this._min,
      max: this._max,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['min'] = this._min;
    json['max'] = this._max;
    json['value'] = this._value;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default InputNumber;
