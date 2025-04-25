<template>
  <youyo-base-frame
    :username="username"
    logo-name="xxx"
    logo-img="https://next.antdv.com/assets/logo.1ef800a8.svg"
    avatar-img="'https://next.antdv.com/assets/logo.1ef800a8.svg'"
    :menu-list="menuItems"
    home-key="0"
    :avatar-menu-list="[]"
    :page-reload="() => {}"
    :page-change="(path: string) => router.push(path)"
    footer-content="xxxxxxxxxxxxxxxx"
  >
    <!--    <a-input v-model:value="username"></a-input>-->
    <router-view />
  </youyo-base-frame>
</template>

<script setup lang="ts">
import { YouyoBaseFrame } from 'youyo-basic-layout/src';
import modules from './router/modules.ts';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref<string>('Admin');
const router = useRouter();
const menuItems = computed(() => modules);
</script>

<style scoped></style>
