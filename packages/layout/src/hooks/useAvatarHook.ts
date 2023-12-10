import { reactive } from 'vue';
import { AvatarMenu, AvatarType } from '../types';

export default function useAvatarHook(username: string, avatarUrl: string, menuItem?: AvatarMenu[]) {
  const avatar = reactive<AvatarType>({
    username,
    avatar: avatarUrl,
    menuItem: menuItem || [],
  });

  return { avatar };
}
