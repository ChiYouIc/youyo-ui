import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CTimePicker } from '../../components';

class TimePicker extends AbstractComponent {
  private _value: string | string[] = '';
  private _placeholder: string = '';
  /** 小时选项间隔 */
  private _hourStep: number = 1;
  /** 分钟选项间隔 */
  private _minuteStep: number = 1;
  /** 秒钟选项间隔 */
  private _secondStep: number = 1;
  private _format = 'HH:mm:ss';
  private _valueFormat = 'HH:mm:ss';
  private _range = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
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

  init({ value, placeholder, hourStep, minuteStep, secondStep, format, valueFormat, range }: Record<string, any>): void {
    this._placeholder = placeholder ?? '';
    this._hourStep = hourStep ?? 1;
    this._minuteStep = minuteStep ?? 1;
    this._secondStep = secondStep ?? 1;
    this._format = format ?? 'HH:mm:ss';
    this._valueFormat = valueFormat ?? this._format;
    this._range = range ?? false;
    const initialValue = value ?? this.defaultValue;
    if (this._range) {
      this._value = Array.isArray(initialValue)
        ? initialValue.length === 0
          ? []
          : [initialValue[0], initialValue[1] ?? initialValue[0]]
        : initialValue
          ? [initialValue, initialValue]
          : [];
    } else {
      this._value = Array.isArray(initialValue) ? (initialValue[0] ?? '') : (initialValue ?? '');
    }
  }

  node(): VNode {
    return h(CTimePicker, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string | string[]) => (this._value = val),
      disabled: this.disabled,
      placeholder: this._placeholder,
      format: this._format,
      valueFormat: this._valueFormat,
      range: this._range,
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
    json['value'] = this._value;
    json['format'] = this._format;
    json['valueFormat'] = this._valueFormat;
    json['range'] = this._range;
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
