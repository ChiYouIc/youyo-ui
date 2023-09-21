import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { Switch as AntSwitch, SwitchProps } from 'ant-design-vue';
import { h, VNode } from 'vue';

type SwitchInitOption = AbstractComponentInitOption<boolean> & {};

class Switch extends AbstractComponent<boolean> {
  constructor(option: AbstractComponentConstructorOption) {
    super(option);
    this.value = false;
  }

  init({ value }: SwitchInitOption): void {
    this.value = value;
  }

  node(): VNode {
    return h<SwitchProps>(AntSwitch, {
      id: this.id,
      checked: this.value,
      'onUpdate:checked': (val: boolean) => (this.value = val),
    });
  }
}

export default Switch;
