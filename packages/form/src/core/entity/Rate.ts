import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { Rate as AntRate, RateProps } from 'ant-design-vue';

type RateInitOption = AbstractComponentInitOption<number> & {};

class Rate extends AbstractComponent<number> {
  public count: number = 5;
  public allowHalf: boolean = false;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
    this.value = 0;
  }

  init(_: RateInitOption): void {}

  node(): VNode {
    return h<RateProps>(AntRate, {
      id: this.id,
      value: this.value,
      'onUpdate:value': (val: number) => (this.value = val),
      count: this.count,
      allowHalf: this.allowHalf,
      disabled: this.disabled,
    });
  }
}

export default Rate;
