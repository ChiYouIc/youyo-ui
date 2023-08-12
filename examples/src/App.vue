<template>
  <youyo-layout>
    <template #sidebar>
      <youyo-logo style="padding: 12px 10px" />
    </template>
    <template #header>
      <a-button @click="handleCollapsible">collapsible</a-button>
      <youyo-avatar />
      <youyo-search />
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
import YouyoLayout from 'youyo-basic-layout/src/layout/index.vue';
import YouyoFooter from 'youyo-basic-layout/src/footer/index.vue';
import YouyoLogo from 'youyo-basic-layout/src/logo/index.vue';
import YouyoAvatar from 'youyo-basic-layout/src/avatar/index.vue';
import YouyoSearch from 'youyo-basic-layout/src/search/index.vue';
import Content from './components/Content.vue';
import useLayoutHook from 'youyo-basic-layout/src/hooks/useLayoutHook.ts';
import useAvatarHook from 'youyo-basic-layout/src/hooks/useAvatarHook.ts';
import useSearchHook from 'youyo-basic-layout/src/hooks/useSearchHook.ts';
import useLogoHook from 'youyo-basic-layout/src/hooks/useLogoHook.ts';

const { layout, switchCollapsible } = useLayoutHook();
const { setupAvatar } = useAvatarHook();
const { setupSearch } = useSearchHook();
const { setupLogo } = useLogoHook();

function handleCollapsible() {
  console.log(layout.sidebar.collapsible);
  switchCollapsible(!layout.sidebar.collapsible);
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
  img: 'https://aliyuncdn.antdv.com/favicon.ico',
});
</script>

<style></style>
