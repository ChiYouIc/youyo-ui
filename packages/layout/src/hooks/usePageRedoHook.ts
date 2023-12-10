import { ref } from 'vue';

export default function usePageRedoHook(timeout?: number) {
  const redo = ref<boolean>(false);

  function startRedo() {
    redo.value = true;
    setTimeout(() => (redo.value = false), timeout || 2 * 1000);
  }

  return {
    redo,
    startRedo,
  };
}
