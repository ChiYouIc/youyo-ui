import { reactive } from 'vue';

export type FooterType = {
  content: string;
};

export default function useFooterHook(content?: string) {
  const footer = reactive<FooterType>({
    content: content || 'Ant Design ©2018 Created by Ant UED',
  });
  return { footer };
}
