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

  init({ value, optionType, options }: Record<string, any>): void {
    this._value = value;
    this._optionType = optionType;
    this._options = options;
  }

  node(): VNode {
    return h(CRadio, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: any) => (this._value = val),
      disabled: this.disabled,
      optionType: this._optionType,
      options: this._options,
    });
  }

  configToJson(): Record<string, any> {
    const toJson = super.configToJson();
    toJson['optionType'] = this._optionType;
    toJson['options'] = this._options;
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
