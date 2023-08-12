<template>
  <youyo-layout>
    <template #sidebar>
      <youyo-logo style="padding: 12px 10px" />
    </template>
    <template #header>
      <a-button @click="switchCollapsible">collapsible</a-button>
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
import { YouyoLayout, YouyoFooter, YouyoAvatar, useLayoutHook, useAvatarHook, useSearchHook } from 'youyo-basic-layout/es';
import { YouyoLogo } from 'youyo-basic-layout/src/logo';
import { useLogoHook } from 'youyo-basic-layout/src/hooks';

import Content from './components/Content.vue';

const { switchCollapsible } = useLayoutHook();
const { setupAvatar } = useAvatarHook();
const { setupSearch } = useSearchHook();
const { setupLogo } = useLogoHook();

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
</script>

<style></style>
