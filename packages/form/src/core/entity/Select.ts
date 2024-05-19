import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { Select as AntSelect, SelectProps } from 'ant-design-vue';
import { ComponentConstructorOptionType } from '../types';
import { SelectValue } from 'ant-design-vue/es/select';

class Select extends AbstractComponent {
  private _value: SelectValue = undefined;
  private _placeholder: string = '';
  private _options: Array<{ label: string; value: string }> = [];

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, placeholder, options }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._options = options;
  }

  node(): VNode {
    return h<SelectProps>(AntSelect, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: SelectValue) => (this._value = val),
      placeholder: this._placeholder,
      disabled: this.disabled,
      options: this._options,
      style: { minWidth: '200px' },
    });
  }

  protected val(): any {
    return this._value;
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['options'] = this._options;
    return json;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get options(): Array<{ label: string; value: string }> {
    return this._options;
  }

  set options(value: Array<{ label: string; value: string }>) {
    this._options = value;
  }
}

export default Select;
