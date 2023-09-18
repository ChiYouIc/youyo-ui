import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { Slider as AntSlider, SliderProps } from 'ant-design-vue';
import { h, VNode } from 'vue';

type SliderInitOption = AbstractComponentInitOption & {};

class Slider extends AbstractComponent {
  public value: number | undefined = undefined;
  public placeholder: string | undefined = undefined;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: SliderInitOption): void {}

  node(): VNode {
    return h<SliderProps>(AntSlider, {
      value: this.value,
      'onUpdate:value': (val: number) => (this.value = val),
    });
  }
}

export default Slider;
