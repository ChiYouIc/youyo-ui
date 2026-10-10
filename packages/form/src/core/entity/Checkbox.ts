import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import AbstractComponent from '../AbstractComponent';
import { CCheckbox } from '../../components';

type CheckboxOption = { label: string; value: string | number; disabled?: boolean };

class Checkbox extends AbstractComponent {
  private _value: Array<string | number> = [];
  private _options: CheckboxOption[] = [];
  private _direction: 'horizontal' | 'vertical' = 'horizontal';
  private _minChecked?: number;
  private _maxChecked?: number;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init({ value, options, direction, minChecked, maxChecked }: Record<string, any>): void {
    this._value = Array.isArray(value) ? value : Array.isArray(this.defaultValue) ? this.defaultValue : [];
    this._options = Array.isArray(options) ? options : [];
    this._direction = direction === 'vertical' ? 'vertical' : 'horizontal';
    this._minChecked = typeof minChecked === 'number' && Number.isFinite(minChecked) ? Math.max(0, Math.floor(minChecked)) : undefined;
    this._maxChecked = typeof maxChecked === 'number' && Number.isFinite(maxChecked) ? Math.max(0, Math.floor(maxChecked)) : undefined;
  }

  node(): VNode {
    return h(CCheckbox, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (value: Array<string | number>) => (this._value = value),
      options: this._options,
      disabled: this.disabled,
      direction: this._direction,
    });
  }

  validate(): string | undefined {
    const requiredError = super.validate();
    if (requiredError) return requiredError;
    if (this._minChecked !== undefined && this._value.length < this._minChecked) {
      return `至少选择 ${this._minChecked} 项`;
    }
    if (this._maxChecked !== undefined && this._value.length > this._maxChecked) {
      return `最多选择 ${this._maxChecked} 项`;
    }
    return undefined;
  }

  configToJson(): Record<string, any> {
    return {
      ...super.configToJson(),
      value: this._value,
      options: this._options,
      direction: this._direction,
      minChecked: this._minChecked,
      maxChecked: this._maxChecked,
    };
  }

  getVal(): Array<string | number> {
    return this._value;
  }

  protected setVal(value: any): void {
    this._value = Array.isArray(value) ? value : [];
  }
}

export default Checkbox;
