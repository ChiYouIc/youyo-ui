import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import AbstractComponent from '../AbstractComponent';
import { CCascader } from '../../components';

type CascaderOption = { label: string; value: string | number; children?: CascaderOption[]; disabled?: boolean };

class Cascader extends AbstractComponent {
  private _value: Array<string | number> = [];
  private _options: CascaderOption[] = [];
  private _placeholder = '请选择';
  private _allowClear = true;
  private _changeOnSelect = false;
  private _showSearch = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, options, placeholder, allowClear, changeOnSelect, showSearch }: Record<string, any>): void {
    this._value = Array.isArray(value) ? value : Array.isArray(this.defaultValue) ? this.defaultValue : [];
    this._options = Array.isArray(options) ? options : [];
    this._placeholder = placeholder ?? '请选择';
    this._allowClear = allowClear ?? true;
    this._changeOnSelect = changeOnSelect ?? false;
    this._showSearch = showSearch ?? false;
  }

  node(): VNode {
    return h(CCascader, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (value: Array<string | number>) => (this._value = value),
      options: this._options,
      placeholder: this._placeholder,
      disabled: this.disabled,
      allowClear: this._allowClear,
      changeOnSelect: this._changeOnSelect,
      showSearch: this._showSearch,
    });
  }

  configToJson(): Record<string, any> {
    return {
      ...super.configToJson(),
      value: this._value,
      options: this._options,
      placeholder: this._placeholder,
      allowClear: this._allowClear,
      changeOnSelect: this._changeOnSelect,
      showSearch: this._showSearch,
    };
  }

  getVal(): Array<string | number> {
    return this._value;
  }

  protected setVal(value: any): void {
    this._value = Array.isArray(value) ? value : [];
  }
}

export default Cascader;
