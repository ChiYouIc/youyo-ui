import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType, UploadValue } from '../types';
import { CUpload } from '../../components';

class Upload extends AbstractComponent {
  private _value: UploadValue = [];
  private _placeholder: string = '点击上传';
  private _accept = '';
  private _multiple = false;
  private _maxCount?: number;
  private _maxSize?: number;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  init({ value, placeholder, accept, multiple, maxCount, maxSize }: Record<string, any>): void {
    this._value = Array.isArray(value) ? value : [];
    this._placeholder = placeholder || '点击上传';
    this._accept = accept ?? '';
    this._multiple = multiple ?? false;
    this._maxCount = maxCount;
    this._maxSize = maxSize;
  }

  node(): VNode {
    return h(CUpload, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: UploadValue) => (this._value = val),
      disabled: this.disabled,
      placeholder: this._placeholder,
      accept: this._accept,
      multiple: this._multiple,
      maxCount: this._maxCount,
      maxSize: this._maxSize,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['value'] = this._value;
    json['accept'] = this._accept;
    json['multiple'] = this._multiple;
    json['maxCount'] = this._maxCount;
    json['maxSize'] = this._maxSize;
    return json;
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = Array.isArray(val) ? val : [];
  }
}

export default Upload;
