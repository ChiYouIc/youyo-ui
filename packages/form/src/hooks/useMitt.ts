import mitt from 'mitt';
import type { ComponentModel, FormModel } from '../core';

export type MittEvents = {
  toConfig: FormModel | ComponentModel;
  toRemove: ComponentModel;
  toClean: undefined;
};

const emitter = mitt<MittEvents>();

export default function useMitt() {
  return {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
  };
}
