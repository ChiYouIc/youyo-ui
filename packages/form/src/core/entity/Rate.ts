import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Rate as AntRate, RateProps } from 'ant-design-vue';

type RateInitOption = AbstractComponentInitOption & {};

class Rate extends AbstractComponent {
  public value: number = 0;
  public count: number = 5;
  public allowHalf: boolean = false;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: RateInitOption): void {}

  node(): VNode {
    return h<RateProps>(AntRate, {
      value: this.value,
      'onUpdate:value': (val: number) => (this.value = val),
      count: this.count,
      allowHalf: this.allowHalf,
      disabled: this.disabled,
    });
  }
}

export default Rate;
