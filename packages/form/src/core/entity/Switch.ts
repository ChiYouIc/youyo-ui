import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { Switch as AntSwitch, SwitchProps } from 'ant-design-vue';
import { h, VNode } from 'vue';

type SwitchInitOption = AbstractComponentInitOption & {};

class Switch extends AbstractComponent {
  public value: boolean = false;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: SwitchInitOption): void {}

  node(): VNode {
    return h<SwitchProps>(AntSwitch, {
      checked: this.value,
      'onUpdate:checked': (val: boolean) => (this.value = val),
    });
  }
}

export default Switch;
