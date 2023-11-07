import { reactive } from 'vue';
import { FooterType } from '../types/footer';

export default function useFooterHook(content?: string) {
  const footer = reactive<FooterType>({
    content: content || 'Ant Design ©2018 Created by Ant UED',
  });
  return { footer };
}
