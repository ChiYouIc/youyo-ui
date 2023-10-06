import { reactive, ref } from 'vue';

export default function useNodeSetting() {
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
