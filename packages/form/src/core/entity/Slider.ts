import AbstractComponent from '../AbstractComponent';
import { Slider as AntSlider, SliderProps } from 'ant-design-vue';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';

class Slider extends AbstractComponent {
  private _value: [number, number] | number = 0;
  private _placeholder: string | undefined = undefined;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init(_: Record<string, any>): void {}

  node(): VNode {
    return h<SliderProps>(AntSlider, { id: this.primaryId(), value: this._value, 'onUpdate:value': (val: [number, number] | number) => (this._value = val) });
  }

  protected getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    return json;
  }

  get placeholder(): string | undefined {
    return this._placeholder;
  }

  set placeholder(value: string | undefined) {
    this._placeholder = value;
  }
}

export default Slider;
