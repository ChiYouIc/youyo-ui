import mitt from 'mitt';

const mitter = mitt();

export default function () {
  return {
    bus: mitter,
  };
}
