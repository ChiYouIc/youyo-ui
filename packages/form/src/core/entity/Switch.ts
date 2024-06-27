import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CSwitch } from '../../components';

class Switch extends AbstractComponent {
  private _value: boolean | string | number = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value }: Record<string, any>): void {
    this._value = value;
  }

  node(): VNode {
    return h(CSwitch, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: boolean | string | number) => (this._value = val),
      disabled: this.disabled,
    });
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Switch;
