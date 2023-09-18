import AbstractComponent from '../AbstractComponent';
import { AbstractComponentConstructorOption, AbstractComponentInitOption } from '../../types';
import { h, VNode } from 'vue';

type UploadInitOption = AbstractComponentInitOption & {};

class Upload extends AbstractComponent {
  public value: string | undefined = undefined;

  constructor(option: AbstractComponentConstructorOption) {
    super(option);
  }

  init(_: UploadInitOption): void {}

  node(): VNode {
    return h('div');
  }
}

export default Upload;
