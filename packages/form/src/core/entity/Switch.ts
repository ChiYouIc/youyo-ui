import AbstractComponent from '../AbstractComponent';
import { Switch as AntSwitch, SwitchProps } from 'ant-design-vue';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';

class Switch extends AbstractComponent {
  private _value: boolean | string | number = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value }: Record<string, any>): void {
    this._value = value;
  }

  node(): VNode {
    return h<SwitchProps>(AntSwitch, {
      id: this.primaryId(),
      checked: this._value,
      'onUpdate:checked': (val: boolean | string | number) => (this._value = val),
    });
  }

  protected val(): any {
    return this._value;
  }
}

export default Switch;
