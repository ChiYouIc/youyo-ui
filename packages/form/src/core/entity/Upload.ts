import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType, UploadValue } from '../types';
import { CUpload } from '../../components';

class Upload extends AbstractComponent {
  private _value: UploadValue = [];
  private _placeholder: string = '点击上传';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  init({ value, placeholder }: Record<string, any>): void {
    this._value = Array.isArray(value) ? value : [];
    this._placeholder = placeholder || '点击上传';
  }

  node(): VNode {
    return h(CUpload, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: UploadValue) => (this._value = val),
      disabled: this.disabled,
      placeholder: this._placeholder,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['placeholder'] = this._placeholder;
    json['value'] = this._value;
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
