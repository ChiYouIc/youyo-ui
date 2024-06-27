import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';

import { ComponentConstructorOptionType } from '../types';
import { SelectValue } from 'ant-design-vue/es/select';
import { CSelect } from '../../components';

class Select extends AbstractComponent {
  private _value: SelectValue = undefined;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _placeholder: string = '';

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  private _options: Array<{ label: string; value: string }> = [];

  get options(): Array<{ label: string; value: string }> {
    return this._options;
  }

  set options(value: Array<{ label: string; value: string }>) {
    this._options = value;
  }

  init({ value, placeholder, options }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._options = options;
  }

  node(): VNode {
    return h(CSelect, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: SelectValue) => (this._value = val),
      placeholder: this._placeholder,
      disabled: this.disabled,
      options: this._options,
      style: { minWidth: '200px' },
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['options'] = this._options;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Select;
