import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { CRadio } from '../../components';
import { ComponentConstructorOptionType } from '../types';

class Radio extends AbstractComponent {
  private _value: any = undefined;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  private _optionType: 'button' | 'default' = 'default';
  private _direction: 'horizontal' | 'vertical' = 'horizontal';
  private _buttonSize: 'large' | 'middle' | 'small' = 'middle';

  get optionType(): 'button' | 'default' {
    return this._optionType;
  }

  set optionType(value: 'button' | 'default') {
    this._optionType = value;
  }

  private _options: Array<{ label: string; value: string; disabled?: boolean }> = [];

  get options(): Array<{ label: string; value: string; disabled?: boolean }> {
    return this._options;
  }

  set options(value: Array<{ label: string; value: string; disabled?: boolean }>) {
    this._options = value;
  }

  init({ value, optionType, options, direction, buttonSize }: Record<string, any>): void {
    this._value = value ?? this.defaultValue;
    this._optionType = optionType ?? 'default';
    this._options = options ?? [];
    this._direction = direction === 'vertical' ? 'vertical' : 'horizontal';
    this._buttonSize = buttonSize ?? 'middle';
  }

  node(): VNode {
    return h(CRadio, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: any) => (this._value = val),
      disabled: this.disabled,
      optionType: this._optionType,
      options: this._options,
      direction: this._direction,
      buttonSize: this._buttonSize,
    });
  }

  configToJson(): Record<string, any> {
    const toJson = super.configToJson();
    toJson['optionType'] = this._optionType;
    toJson['options'] = this._options;
    toJson['value'] = this._value;
    toJson['direction'] = this._direction;
    toJson['buttonSize'] = this._buttonSize;
    return toJson;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Radio;
