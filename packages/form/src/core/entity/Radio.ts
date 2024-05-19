import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { RadioGroup as AntRadioGroup, RadioGroupProps } from 'ant-design-vue';
import { ComponentConstructorOptionType } from '../types';

class Radio extends AbstractComponent {
  private _value: any = undefined;
  private _optionType: 'button' | 'default' = 'default';
  private _options: Array<{ label: string; value: string; disabled?: boolean }> = [];

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, optionType, options }: Record<string, any>): void {
    this._value = value;
    this._optionType = optionType;
    this._options = options;
  }

  node(): VNode {
    return h<RadioGroupProps>(AntRadioGroup, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: any) => (this._value = val),
      disabled: this.disabled,
      optionType: this._optionType,
      options: this._options,
    });
  }

  protected val(): any {
    return this._value;
  }

  get optionType(): 'button' | 'default' {
    return this._optionType;
  }

  set optionType(value: 'button' | 'default') {
    this._optionType = value;
  }

  get options(): Array<{ label: string; value: string; disabled?: boolean }> {
    return this._options;
  }

  set options(value: Array<{ label: string; value: string; disabled?: boolean }>) {
    this._options = value;
  }
}

export default Radio;
