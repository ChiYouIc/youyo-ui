import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';
import { RadioGroup as AntRadioGroup, RadioGroupProps } from 'ant-design-vue';

type RadioInitOption = AbstractComponentInitOption & {
  value: string | undefined;
  optionType: 'button' | 'default';
  options: Array<{ label: string; value: string; disabled?: boolean }>;
};

class Radio extends AbstractComponent {
  public value: string | undefined = undefined;
  public optionType: 'button' | 'default' = 'default';
  public options: Array<{ label: string; value: string; disabled?: boolean }> = [];

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init({ value, optionType, options }: RadioInitOption): void {
    this.value = value;
    this.optionType = optionType;
    this.options = options;
  }

  node(): VNode {
    return h<RadioGroupProps>(AntRadioGroup, {
      value: this.value,
      'onUpdate:value': (val: string) => (this.value = val),
      disabled: this.disabled,
      optionType: this.optionType,
      options: this.options,
    });
  }
}

export default Radio;
