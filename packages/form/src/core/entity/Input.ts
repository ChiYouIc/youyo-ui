import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { CInput } from '../../components';
import { ComponentConstructorOptionType } from '../types';

class Input extends AbstractComponent {
  private _value: string = '';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _placeholder: string = '请输入内容';

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  private _maxlength: number = 500;

  get maxlength(): number {
    return this._maxlength;
  }

  set maxlength(value: number) {
    this._maxlength = value;
  }

  init({ value, placeholder, maxlength }: Record<string, any>): void {
    this._value = value;
    this._placeholder = placeholder;
    this._maxlength = maxlength;
  }

  node(): VNode {
    return h(CInput, {
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

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['maxlength'] = this._maxlength;
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

export default Input;
