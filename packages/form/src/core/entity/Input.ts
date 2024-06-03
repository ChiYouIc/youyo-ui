import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { Input as AntInput, InputProps } from 'ant-design-vue';
import { ComponentConstructorOptionType } from '../types';

class Input extends AbstractComponent {
  private _value: string = '';
  private _placeholder: string = '请输入内容';
  private _maxlength: number = 500;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, placeholder, maxlength }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._maxlength = maxlength;
  }

  node(): VNode {
    return h<InputProps>(AntInput, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string) => (this._value = val),
      placeholder: this._placeholder,
      disabled: this.disabled,
      maxlength: this._maxlength,
      allowClear: true,
      style: { width: '200px' },
    });
  }

  protected getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['maxlength'] = this._maxlength;
    return json;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get maxlength(): number {
    return this._maxlength;
  }

  set maxlength(value: number) {
    this._maxlength = value;
  }
}

export default Input;
