import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { DatePicker as AntDatePicker, DatePickerProps } from 'ant-design-vue';
import { Dayjs } from 'dayjs';
import { ComponentConstructorOptionType } from '../types';

class DatePicker extends AbstractComponent {
  private _value: string | Dayjs = '';
  private _placeholder: string = '请选择日期';
  private _picker: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, placeholder, picker }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._picker = picker;
  }

  node(): VNode {
    return h<DatePickerProps>(AntDatePicker, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string | Dayjs) => (this._value = val),
      picker: this._picker,
      disabled: this.disabled,
      placeholder: this._placeholder,
    });
  }

  protected val(): any {
    return this._value;
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['picker'] = this._picker;
    return json;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get picker(): 'date' | 'week' | 'month' | 'quarter' | 'year' {
    return this._picker;
  }

  set picker(value: 'date' | 'week' | 'month' | 'quarter' | 'year') {
    this._picker = value;
  }
}

export default DatePicker;
