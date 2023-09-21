import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';

type UploadInitOption = AbstractComponentInitOption<string> & {};

class Upload extends AbstractComponent<string> {
  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: UploadInitOption): void {}

  node(): VNode {
    return h('div', { id: this.id });
  }
}

export default Upload;
