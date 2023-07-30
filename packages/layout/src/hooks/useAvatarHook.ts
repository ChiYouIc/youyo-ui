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

const avatar: AvatarHookType = {};

export default function useAvatarHook() {
  return {
    setup: (param: AvatarHookType) => {
      avatar.center = param.center;
      avatar.information = param.information;
      avatar.logout = param.logout;
    },
    ...avatar,
  };
}
