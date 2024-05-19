import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { TimePicker as AntTimePicker, TimePickerProps } from 'ant-design-vue';

import { ComponentConstructorOptionType } from '../types';

class TimePicker extends AbstractComponent {
  private _value: string = '';
  private _placeholder: string = '';
  /** 小时选项间隔 */
  private _hourStep: number = 1;
  /** 分钟选项间隔 */
  private _minuteStep: number = 1;
  /** 秒钟选项间隔 */
  private _secondStep: number = 1;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, placeholder, hourStep, minuteStep, secondStep }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._hourStep = hourStep;
    this._minuteStep = minuteStep;
    this._secondStep = secondStep;
  }

  node(): VNode {
    return h<TimePickerProps>(AntTimePicker, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string) => (this._value = val),
      placeholder: this._placeholder,
      valueFormat: 'HH:mm:ss',
      hourStep: this._hourStep,
      minuteStep: this._minuteStep,
      secondStep: this._secondStep,
    });
  }

  protected val(): any {
    return this._value;
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['hourStep'] = this._hourStep;
    json['minuteStep'] = this._minuteStep;
    json['secondStep'] = this._secondStep;
    return json;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get hourStep(): number {
    return this._hourStep;
  }

  set hourStep(value: number) {
    this._hourStep = value;
  }

  get minuteStep(): number {
    return this._minuteStep;
  }

  set minuteStep(value: number) {
    this._minuteStep = value;
  }

  get secondStep(): number {
    return this._secondStep;
  }

  set secondStep(value: number) {
    this._secondStep = value;
  }
}

export default TimePicker;
