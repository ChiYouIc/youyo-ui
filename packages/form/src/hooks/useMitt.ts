import mitt from 'mitt';

const emitter = mitt();

export default function useMitt() {
  return {
    on: emitter.on,
    emit: emitter.emit,
  };
}
