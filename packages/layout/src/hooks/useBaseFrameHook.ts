import { computed, reactive } from 'vue';
import { MenuItemType, SearchItemType } from '../types';
import { useAvatarHook, useFooterHook, useLayoutHook, useLogoHook, useMenuHook, useSearchHook } from './index';

export interface BaseFrameType {
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  menuList: MenuItemType[];
}

export default function useBaseFrameHook(options: BaseFrameType) {
  const baseFrame = reactive(options);

  const searchItemList = computed<SearchItemType[]>(() => {
    function find(root: MenuItemType, rootStr: string | null): SearchItemType[] {
      rootStr = (rootStr === null ? '' : rootStr + '-') + root.title;

      if (root.children.length === 0) {
        return [{ label: rootStr, value: rootStr, path: root.path }];
      }

      let rs: SearchItemType[] = [];
      const children = root.children;
      for (let i = 0; i < children.length; i++) {
        rs = [...rs, ...find(children[i], rootStr)];
      }

      return rs;
    }
    let result: SearchItemType[] = [];
    baseFrame.menuList.forEach(r => (result = [...result, ...find(r, null)]));
    console.log(result);
    return result;
  });

  const { layout, switchCollapsible } = useLayoutHook();
  const { avatar } = useAvatarHook(baseFrame.username, baseFrame.avatarImg, [
    {
      title: 'string',
      icon: 'string',
      action: () => console.log('sssss'),
    },
  ]);
  const { footer } = useFooterHook();
  const { logo, switchShowName } = useLogoHook(baseFrame.logoName, baseFrame.logoImg, 50, 50, false);
  const { search } = useSearchHook(searchItemList.value, { checked: val => console.log(val) });
  const { menu, switchInlineCollapsed } = useMenuHook(baseFrame.menuList, [], [], false, 'light', 'inline', {
    menuClick: item => console.log(item),
    menuChange: oKeys => console.log(oKeys),
  });

  function switchCol() {
    switchInlineCollapsed();
    switchCollapsible();
    switchShowName();
  }

  return {
    layout,
    avatar,
    footer,
    logo,
    search,
    menu,
    switchCol,
  };
}
