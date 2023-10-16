import { reactive, ref } from 'vue';
import { NodeType } from '../types';

export default function useNodeSetting(node: NodeType) {
  const visible = ref<boolean>(false);

  return reactive({
    visible,
    form: {},
    onOpen: () => {
      visible.value = true;
      // open();
      console.log(visible.value);
    },
    onClose: () => {
      visible.value = false;
      // close();
    },
  });
}
