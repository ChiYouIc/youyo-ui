import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CSlider } from '../../components';

class Slider extends AbstractComponent {
  private _value: [number, number] | number = 0;

  private _placeholder: string | undefined = undefined;
  private _min: number = 0;
  private _max: number = 100;
  private _step: number = 1;
  private _range: boolean = false;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  get placeholder(): string | undefined {
    return this._placeholder;
  }

  set placeholder(value: string | undefined) {
    this._placeholder = value;
  }

  init({ placeholder, value, min, max, step, range }: Record<string, any>): void {
    this._min = min ?? 0;
    this._max = max ?? 100;
    this._step = step ?? 1;
    this._range = range ?? (Array.isArray(value) && value.length === 2);
    const initialValue = value ?? this.defaultValue;
    if (this._range) {
      this._value = Array.isArray(initialValue)
        ? [initialValue[0] ?? this._min, initialValue[1] ?? this._max]
        : [initialValue ?? this._min, this._max];
    } else {
      this._value = Array.isArray(initialValue) ? (initialValue[0] ?? this._min) : (initialValue ?? this._min);
    }
    this._placeholder = placeholder;
  }

  node(): VNode {
    return h(CSlider, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: [number, number] | number) => (this._value = val),
      disabled: this.disabled,
      min: this._min,
      max: this._max,
      step: this._step,
      range: this._range,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['value'] = this._value;
    json['min'] = this._min;
    json['max'] = this._max;
    json['step'] = this._step;
    json['range'] = this._range;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Slider;
