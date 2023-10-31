import { reactive } from 'vue';

export interface AvatarMenu {
  title: string;
  icon: string;
  action: () => void;
}

export type AvatarType = {
  username: string;
  avatar: string;
  menuItem: AvatarMenu[];
};

export default function useAvatarHook(username: string, avatarUrl: string, menuItem?: AvatarMenu[]) {
  const avatar = reactive<AvatarType>({
    username,
    avatar: avatarUrl,
    menuItem: menuItem || [],
  });
  return { avatar };
}
