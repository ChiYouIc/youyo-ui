<template>
  <div class="base-frame-layout">
    <youyo-layout v-bind="layout">
      <template #sidebar>
        <youyo-logo v-bind="logo" style="padding: 12px 10px" />
        <youyo-menu v-bind="menu" />
      </template>
      <template #header>
        <div class="base-frame-header">
          <div class="left">
            <span class="fold" @click="switchCol">
              <menu-unfold-outlined v-if="menu.inlineCollapsed" />
              <menu-fold-outlined v-else />
            </span>
          </div>
          <div class="right">
            <youyo-search v-bind="search" />
            <youyo-avatar v-bind="avatar" />
          </div>
        </div>
      </template>
      <template #tabs>
        <span>sss</span>
      </template>
      <template #content>
        <slot></slot>
      </template>
      <template #footer>
        <youyo-footer v-bind="footer" />
      </template>
    </youyo-layout>
  </div>
</template>

<script setup lang="ts" name="youyo-base-frame">
import './style/base.less';
import YouyoMenu from '../menu/index.vue';
import YouyoLayout from '../layout/index.vue';
import YouyoLogo from '../logo/index.vue';
import YouyoAvatar from '../avatar/index.vue';
import YouyoSearch from '../search/index.vue';
import YouyoFooter from '../footer/index.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useAvatarHook, useFooterHook, useLayoutHook, useLogoHook, useMenuHook, useSearchHook } from '../hooks';
import { computed } from 'vue';
import { SearchItemType } from '../hooks/useSearchHook';

export interface BaseFrameProps {
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  menuList: BaseFrameMenuType[];
}

export interface BaseFrameMenuType {
  key: string;
  title: string;
  path: string;
  icon?: string;
  hidden: boolean;
  children: BaseFrameMenuType[];
}

const props = defineProps<BaseFrameProps>();

const searchItemList = computed<SearchItemType[]>(() => {
  function find(root: BaseFrameMenuType, rootStr: string | null): SearchItemType[] {
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
  props.menuList.forEach(r => (result = [...result, ...find(r, null)]));
  console.log(result);
  return result;
});

const { layout, switchCollapsible } = useLayoutHook();
const { avatar } = useAvatarHook(props.username, props.avatarImg, [
  {
    title: 'string',
    icon: 'string',
    action: () => console.log('sssss'),
  },
]);
const { footer } = useFooterHook();
const { logo, switchShowName } = useLogoHook(props.logoName, props.logoImg, 50, 50, false);
const { search } = useSearchHook(searchItemList.value, { checked: val => console.log(val) });
const { menu, switchInlineCollapsed } = useMenuHook(props.menuList, [], [], false, 'light', 'inline', {
  menuClick: item => console.log(item),
  menuChange: oKeys => console.log(oKeys),
});

function switchCol() {
  switchInlineCollapsed();
  switchCollapsible();
  switchShowName();
}
</script>

<style scoped></style>
