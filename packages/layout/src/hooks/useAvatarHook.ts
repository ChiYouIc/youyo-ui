import { reactive, toRefs } from 'vue';

export type AvatarHookType = {
  username: string;
  avatar: string;
  menuItem: AvatarMenu[];
};

export interface AvatarMenu {
  title: string;
  icon: string;
  action: () => void;
}

const avatar = reactive<AvatarHookType>({});

export default function useAvatarHook() {
  return {
    setupAvatar: (param: AvatarHookType) => {
      avatar.username = param.username;
      avatar.avatar = param.avatar;
      avatar.menuItem = param.menuItem;
    },
    ...toRefs(avatar),
  };
}
