export type ContentHookType = {
  maxKeepAlive: number;
};

const content: ContentHookType = {
  maxKeepAlive: 20,
};

export default function useContentHook() {
  return {
    setup: (param: ContentHookType) => {
      content.maxKeepAlive = param.maxKeepAlive;
    },
    maxKeepAlive: (() => content.maxKeepAlive)(),
  };
}
