import mitt from 'mitt';

const emitter = mitt();

export function useMitt() {
  return {
    on: emitter.on,
    emit: emitter.emit,
  };
}
