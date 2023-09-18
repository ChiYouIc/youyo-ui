import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { TimePicker as AntTimePicker, TimePickerProps } from 'ant-design-vue';

type TimePickerInitOption = AbstractComponentInitOption & {
  value: string | undefined;
  placeholder: string;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
};

class TimePicker extends AbstractComponent {
  public value: string | undefined = undefined;
  public placeholder: string = '';
  /** 小时选项间隔 */
  public hourStep: number = 1;
  /** 分钟选项间隔 */
  public minuteStep: number = 1;
  /** 秒钟选项间隔 */
  public secondStep: number = 1;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init({ value, placeholder, hourStep, minuteStep, secondStep }: TimePickerInitOption): void {
    this.value = value;
    this.placeholder = placeholder;
    this.hourStep = hourStep;
    this.minuteStep = minuteStep;
    this.secondStep = secondStep;
  }

  node(): VNode {
    return h<TimePickerProps>(AntTimePicker, {
      value: this.value,
      'onUpdate:value': (val: string) => (this.value = val),
      placeholder: this.placeholder,
      valueFormat: 'HH:mm:ss',
      hourStep: this.hourStep,
      minuteStep: this.minuteStep,
      secondStep: this.secondStep,
    });
  }
}

export default TimePicker;
