<template>
  <youyo-layout>
    <template #sidebar>
      <youyo-logo style="padding: 12px 10px" />
      <youyo-menu />
    </template>
    <template #header>
      <a-button @click="switchCol">collapsible</a-button>
      <youyo-avatar />
      <!--      <youyo-search />-->
    </template>
    <template #content>
      <content />
    </template>
    <template #footer>
      <youyo-footer />
    </template>
  </youyo-layout>
</template>

<script setup lang="ts">
import { YouyoLayout, YouyoFooter, YouyoAvatar, YouyoLogo, useLayoutHook, useAvatarHook, useSearchHook, useLogoHook } from 'youyo-basic-layout/es';
import { YouyoMenu } from 'youyo-basic-layout/src/menu';
import { useMenuHook } from 'youyo-basic-layout/src/hooks';

import Content from './components/Content.vue';

const { switchCollapsible } = useLayoutHook();
const { setupAvatar } = useAvatarHook();
const { setupSearch } = useSearchHook();
const { setupLogo, switchShowName } = useLogoHook();
const { setupMenu, switchInlineCollapsed } = useMenuHook();

function switchCol() {
  switchInlineCollapsed();
  switchCollapsible();
  switchShowName();
}

setupAvatar({
  username: 'string',
  avatar: 'https://aliyuncdn.antdv.com/favicon.ico',
  menuItem: [
    {
      title: 'string',
      icon: 'string',
      action: () => console.log('sssss'),
    },
  ],
});

setupSearch({
  searchList: [
    { label: '菜单1', value: '菜单1' },
    { label: '茄子', value: '茄子' },
    { label: '黄瓜', value: '黄瓜' },
    { label: '白菜', value: '白菜' },
    { label: '西红柿', value: '西红柿' },
  ],
  action: (val: string) => console.log(val),
});

setupLogo({
  name: 'Youyo-basic-layout',
  img: 'https://cn.vuejs.org/logo.svg',
  width: 50,
  height: 50,
  showName: false,
});

setupMenu({
  menuList: [
    {
      key: '1',
      title: 'nihao',
      path: '/home',
      icon: '',
      hidden: false,
      children: [
        {
          key: '1-1',
          title: 'nihao1-1',
          path: '/home',
          icon: '',
          hidden: false,
          children: [],
        },
      ],
    },
    {
      key: '2',
      title: 'nihao',
      path: '/home',
      icon: '',
      hidden: false,
      children: [],
    },
    {
      key: '3',
      title: 'nihao',
      path: '/home',
      icon: '',
      hidden: false,
      children: [],
    },
  ],
  openKeys: [],
  selectedKeys: [],
  inlineCollapsed: false,
  theme: 'light',
  model: 'inline',
  menuChange: keys => console.log(keys),
});
</script>

<style></style>
