<template>
  <youyo-base-frame username="Admin" avatar-img="https://next.antdv.com/assets/logo.1ef800a8.svg" logo-name="xxxx" logo-img="https://next.antdv.com/assets/logo.1ef800a8.svg" :menu-list="menuList">
    <div>sss</div>
  </youyo-base-frame>
</template>

<script setup lang="ts">
import { YouyoBaseFrame } from 'youyo-basic-layout';

import { ref } from 'vue';
import { BaseFrameMenuType } from 'youyo-basic-layout/es/frame/BaseFrame.vue';

const menuList = ref<BaseFrameMenuType[]>([
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
]);
</script>

<style></style>
