import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import AbstractComponent from '../AbstractComponent';
import { CTextarea } from '../../components';

class Textarea extends AbstractComponent {
  private _value = '';
  private _placeholder = '请输入内容';
  private _maxlength = 500;
  private _rows = 4;
  private _showCount = false;
  private _allowClear = true;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, placeholder, maxlength, rows, showCount, allowClear }: Record<string, any>): void {
    this._value = value ?? this.defaultValue ?? '';
    this._placeholder = placeholder ?? '请输入内容';
    this._maxlength = maxlength ?? 500;
    this._rows = rows ?? 4;
    this._showCount = showCount ?? false;
    this._allowClear = allowClear ?? true;
  }

  node(): VNode {
    return h(CTextarea, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (value: string) => (this._value = value),
      placeholder: this._placeholder,
      disabled: this.disabled,
      maxlength: this._maxlength,
      rows: this._rows,
      showCount: this._showCount,
      allowClear: this._allowClear,
    });
  }

  configToJson(): Record<string, any> {
    return {
      ...super.configToJson(),
      value: this._value,
      placeholder: this._placeholder,
      maxlength: this._maxlength,
      rows: this._rows,
      showCount: this._showCount,
      allowClear: this._allowClear,
    };
  }

  getVal(): string {
    return this._value;
  }

  protected setVal(value: any): void {
    this._value = value ?? '';
  }
}

export default Textarea;
