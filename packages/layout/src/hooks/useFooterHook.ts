import { reactive, toRefs } from 'vue';

export type FooterHookType = {
  content: string;
};

const footer = reactive<FooterHookType>({
  content: 'Ant Design ©2018 Created by Ant UED',
});
export default function useFooterHook() {
  return {
    setup: (param: FooterHookType) => {
      footer.content = param.content;
    },
    ...toRefs(footer),
  };
}
