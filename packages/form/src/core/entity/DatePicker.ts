import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { Dayjs } from 'dayjs';
import { ComponentConstructorOptionType } from '../types';
import { CDatePicker } from '../../components';

type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';

class DatePicker extends AbstractComponent {
  private _value: string | Dayjs | Array<string | Dayjs> = '';
  private _placeholder: string = '请选择日期';
  private _picker: PickerType = 'date';
  private _format = 'YYYY-MM-DD';
  private _valueFormat = 'YYYY-MM-DD';
  private _range = false;
  private _minDate?: string;
  private _maxDate?: string;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get picker(): PickerType {
    return this._picker;
  }

  set picker(value: PickerType) {
    this._picker = value;
  }

  init({ value, placeholder, picker, format, valueFormat, range, minDate, maxDate }: Record<string, any>): void {
    this._placeholder = placeholder ?? '请选择日期';
    this._picker = picker ?? 'date';
    this._format = format ?? 'YYYY-MM-DD';
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
    this._minDate = minDate;
    this._maxDate = maxDate;
  }

  node(): VNode {
    return h(CDatePicker, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string | Dayjs | Array<string | Dayjs>) => (this._value = val),
      picker: this._picker,
      disabled: this.disabled,
      placeholder: this._placeholder,
      format: this._format,
      valueFormat: this._valueFormat,
      range: this._range,
      minDate: this._minDate,
      maxDate: this._maxDate,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['picker'] = this._picker;
    json['value'] = this._value;
    json['format'] = this._format;
    json['valueFormat'] = this._valueFormat;
    json['range'] = this._range;
    json['minDate'] = this._minDate;
    json['maxDate'] = this._maxDate;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default DatePicker;
