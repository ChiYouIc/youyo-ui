import AbstractComponent from '../AbstractComponent';
import { h, VNode } from 'vue';
import { ComponentConstructorOptionType } from '../types';

class Upload extends AbstractComponent {
  private _value: string = '';

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  init(_: Record<string, any>): void {}

  node(): VNode {
    return h('div', { id: this.primaryId() });
  }

  protected val(): any {
    return this._value;
  }
}

export default Upload;
