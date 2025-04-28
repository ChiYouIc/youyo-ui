import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { Dayjs } from 'dayjs';
import { ComponentConstructorOptionType } from '../types';
import { CDatePicker } from '../../components';

type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';

class DatePicker extends AbstractComponent {
  private _value: string | Dayjs = '';
  private _placeholder: string = '请选择日期';
  private _picker: PickerType = 'date';

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

  init({ value, placeholder, picker }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._picker = picker;
  }

  node(): VNode {
    return h(CDatePicker, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string | Dayjs) => (this._value = val),
      picker: this._picker,
      disabled: this.disabled,
      placeholder: this._placeholder,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['picker'] = this._picker;
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

export default DatePicker;
