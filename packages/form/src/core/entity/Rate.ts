import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { Rate as AntRate, RateProps } from 'ant-design-vue';
import { ComponentConstructorOptionType } from '../types';

class Rate extends AbstractComponent {
  private _value: number = 0;
  private _count: number = 5;
  private _allowHalf: boolean = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init(_: Record<string, any>): void {}

  node(): VNode {
    return h<RateProps>(AntRate, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: number) => (this._value = val),
      count: this._count,
      allowHalf: this._allowHalf,
      disabled: this.disabled,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['count'] = this._count;
    json['allowHalf'] = this._allowHalf;
    return json;
  }

  protected val(): any {
    return this._value;
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }

  get allowHalf(): boolean {
    return this._allowHalf;
  }

  set allowHalf(value: boolean) {
    this._allowHalf = value;
  }
}

export default Rate;
