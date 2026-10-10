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

  private _options: Array<{ label: string; value: string | number; disabled?: boolean }> = [];

  private _mode?: 'multiple' | 'tags';
  private _showSearch = false;
  private _allowClear = true;
  private _maxCount?: number;

  get options(): Array<{ label: string; value: string | number; disabled?: boolean }> {
    return this._options;
  }

  set options(value: Array<{ label: string; value: string | number; disabled?: boolean }>) {
    this._options = value;
  }

  init({ value, placeholder, options, mode, showSearch, allowClear, maxCount }: Record<string, any>): void {
    this._mode = mode;
    const initialValue = value ?? this.defaultValue;
    this._value = this._mode
      ? Array.isArray(initialValue)
        ? initialValue
        : initialValue === undefined || initialValue === null
          ? []
          : [initialValue]
      : Array.isArray(initialValue)
        ? initialValue[0]
        : initialValue;
    this._placeholder = placeholder ?? '';
    this._options = options ?? [];
    this._showSearch = showSearch ?? false;
    this._allowClear = allowClear ?? true;
    this._maxCount = maxCount;
  }

  node(): VNode {
    return h(CSelect, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: SelectValue) => (this._value = val),
      placeholder: this._placeholder,
      disabled: this.disabled,
      options: this._options,
      mode: this._mode,
      showSearch: this._showSearch,
      allowClear: this._allowClear,
      maxCount: this._maxCount,
      style: { minWidth: '200px' },
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['options'] = this._options;
    json['value'] = this._value;
    json['mode'] = this._mode;
    json['showSearch'] = this._showSearch;
    json['allowClear'] = this._allowClear;
    json['maxCount'] = this._maxCount;
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
