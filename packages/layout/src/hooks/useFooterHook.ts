export type FooterHookType = {
  content: string;
};

const footer: FooterHookType = {
  content: 'Ant Design ©2018 Created by Ant UED',
};
export default function useFooterHook() {
  return {
    setup: (param: FooterHookType) => {
      footer.content = param.content;
    },
    content: footer.content,
  };
}
