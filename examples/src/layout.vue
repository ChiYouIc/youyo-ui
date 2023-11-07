<template>
  <youyo-base-frame v-bind="baseFrame">
    <div>sss</div>
    <a-input v-model:value="baseFrame.avatar.username"></a-input>
  </youyo-base-frame>
</template>

<script setup lang="ts">
import YouyoBaseFrame from '../../packages/layout/src/frame/BaseFrame.vue';

import useBaseFrameHook from '../../packages/layout/src/hooks/useBaseFrameHook.ts';

const baseFrame = useBaseFrameHook({
  logoName: 'Admin',
  logoImg: 'https://next.antdv.com/assets/logo.1ef800a8.svg',
  username: 'xxxx',
  avatarImg: 'https://next.antdv.com/assets/logo.1ef800a8.svg',
  menuList: [
    {
      key: '1',
      title: 'nihao',
      path: '/home',
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
      hidden: false,
      children: [],
    },
    {
      key: '3',
      title: 'nihao',
      path: '/home',
      hidden: false,
      children: [],
    },
  ],
});
</script>

<style></style>
