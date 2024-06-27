import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CSlider } from '../../components';

class Slider extends AbstractComponent {
  private _value: [number, number] | number = 0;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _placeholder: string | undefined = undefined;

  get placeholder(): string | undefined {
    return this._placeholder;
  }

  set placeholder(value: string | undefined) {
    this._placeholder = value;
  }

  init(_: Record<string, any>): void {}

  node(): VNode {
    return h(CSlider, { id: this.primaryId(), value: this._value, 'onUpdate:value': (val: [number, number] | number) => (this._value = val), disabled: this.disabled });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Slider;
