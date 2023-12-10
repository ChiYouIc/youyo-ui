import { reactive } from 'vue';
import type { ItemType } from 'ant-design-vue';

export type BaseFrameType = {
  homePath: string;
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  menuList: ItemType[];
};

export default function useBaseFrameHook(homePath: string, logoName: string, logoImg: string, username: string, avatarImg: string, menuList: ItemType[]) {
  const baseFrame = reactive<BaseFrameType>({
    homePath,
    logoName,
    logoImg,
    username,
    avatarImg,
    menuList,
  });

  return {
    baseFrame,
  };
}
