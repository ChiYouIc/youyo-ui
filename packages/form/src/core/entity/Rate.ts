import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { CRate } from '../../components';
import { ComponentConstructorOptionType } from '../types';

class Rate extends AbstractComponent {
  private _value: number = 0;
  private _count: number = 5;
  private _allowHalf: boolean = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
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

  init({ value, count, allowHalf }: Record<string, any>): void {
    this._value = value;
    this._count = count;
    this._allowHalf = allowHalf;
  }

  node(): VNode {
    return h(CRate, {
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

export default Rate;
