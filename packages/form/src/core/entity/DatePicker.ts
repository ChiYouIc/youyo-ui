import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption, DateType } from '../../types';
import { h, VNode } from 'vue';
import { DatePicker as AntDatePicker, DatePickerProps } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

type DatePickerInitOption = AbstractComponentInitOption<DateType> & {
  value: string;
  placeholder: string;
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
};

class DatePicker extends AbstractComponent<DateType> {
  public placeholder: string = '请选择日期';
  public picker: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init({ value, placeholder, picker }: DatePickerInitOption): void {
    const day = dayjs(value);
    this.value = {
      date: day.format('YYYY-MM-DD'),
      year: day.format('YYYY'),
      month: day.format('YYYY-MM'),
      week: day.format('ww'),
      quarter: day.format('Q'),
    };
    this.placeholder = placeholder;
    this.picker = picker;
  }

  fetchValue(val: Dayjs) {
    let v: typeof this.value;
    if (val) {
      const day = dayjs(val);
      v = {
        date: day.format('YYYY-MM-DD'),
        year: day.format('YYYY'),
        month: day.format('YYYY-MM'),
        week: day.format('ww'),
        quarter: day.format('Q'),
      };
    }
    this.value = v;
  }

  node(): VNode {
    return h<DatePickerProps>(AntDatePicker, {
      id: this.id,
      value: this.value ? dayjs(this.value?.date) : undefined,
      'onUpdate:value': (val: Dayjs) => this.fetchValue(val),
      picker: this.picker,
      disabled: this.disabled,
      placeholder: this.placeholder,
    });
  }
}

export default DatePicker;
