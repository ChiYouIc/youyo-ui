import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';
import { CUpload } from '../../components';

class Upload extends AbstractComponent {
  private _value: string = '';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init(_: Record<string, any>): void {}

  node(): VNode {
    return h(CUpload, { id: this.primaryId(), disabled: this.disabled, placeholder: 'upload' });
  }

  public getVal(): any {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val;
  }
}

export default Upload;
