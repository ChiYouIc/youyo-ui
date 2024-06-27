import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CTimePicker } from '../../components';

class TimePicker extends AbstractComponent {
  private _value: string = '';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _placeholder: string = '';

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  /** 小时选项间隔 */
  private _hourStep: number = 1;

  get hourStep(): number {
    return this._hourStep;
  }

  set hourStep(value: number) {
    this._hourStep = value;
  }

  /** 分钟选项间隔 */
  private _minuteStep: number = 1;

  get minuteStep(): number {
    return this._minuteStep;
  }

  set minuteStep(value: number) {
    this._minuteStep = value;
  }

  /** 秒钟选项间隔 */
  private _secondStep: number = 1;

  get secondStep(): number {
    return this._secondStep;
  }

  set secondStep(value: number) {
    this._secondStep = value;
  }

  init({ value, placeholder, hourStep, minuteStep, secondStep }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._hourStep = hourStep;
    this._minuteStep = minuteStep;
    this._secondStep = secondStep;
  }

  node(): VNode {
    return h(CTimePicker, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string) => (this._value = val),
      disabled: this.disabled,
      placeholder: this._placeholder,
      valueFormat: 'HH:mm:ss',
      hourStep: this._hourStep,
      minuteStep: this._minuteStep,
      secondStep: this._secondStep,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['hourStep'] = this._hourStep;
    json['minuteStep'] = this._minuteStep;
    json['secondStep'] = this._secondStep;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default TimePicker;
