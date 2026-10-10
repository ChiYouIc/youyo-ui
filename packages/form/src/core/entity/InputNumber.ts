import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CInputNumber } from '../../components';

class InputNumber extends AbstractComponent {
  private _value: string | number = 0;
  private _min: number = -1000;
  private _max: number = 1000;
  private _placeholder: string = '请输入数值';
  private _step: number = 1;
  private _precision: number | undefined;

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

  get step(): number {
    return this._step;
  }

  set step(value: number) {
    this._step = value;
  }

  get precision(): number | undefined {
    return this._precision;
  }

  set precision(value: number | undefined) {
    this._precision = value;
  }

  init({ value, max, min, placeholder, step, precision }: Record<string, any>): void {
    this._value = value ?? this.defaultValue ?? 0;
    this._placeholder = placeholder ?? '请输入数值';
    this._max = max ?? 1000;
    this._min = min ?? -1000;
    this._step = step ?? 1;
    this._precision = precision;
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
      step: this._step,
      precision: this._precision,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['min'] = this._min;
    json['max'] = this._max;
    json['step'] = this._step;
    json['precision'] = this._precision;
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
