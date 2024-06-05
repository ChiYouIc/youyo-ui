<template>
  <youyo-base-frame
    :username="username"
    logo-name="xxx"
    logo-img="https://next.antdv.com/assets/logo.1ef800a8.svg"
    avatar-img="'https://next.antdv.com/assets/logo.1ef800a8.svg'"
    :menu-list="items"
    :avatar-menu-list="[]"
    :page-reload="() => {}"
    :page-change="(path: string) => router.push(path)"
    footer-content="xxxxxxxxxxxxxxxx"
  >
    <a-input v-model:value="username"></a-input>
    <router-view />
  </youyo-base-frame>
</template>

<script setup lang="ts">
import YouyoBaseFrame from '../../../packages/layout/src/frame/BaseFrame.vue';

import { h, reactive, ref } from 'vue';
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { ItemLabelType, ItemType, MenuItemType, SubMenuType } from 'youyo-basic-layout/src';
import { RouterLink, useRouter } from 'vue-router';

const username = ref<string>('Admin');
const router = useRouter();

function getItem(key: string, title: string, label: ItemLabelType, children: ItemType[], icon?: any): SubMenuType {
  return {
    key,
    title,
    icon,
    children,
    label,
  };
}

function getMenuItem(key: string, title: string, label: ItemLabelType, path: string, icon?: any): MenuItemType {
  return {
    key,
    title,
    icon,
    label,
    path,
  };
}

const items: ItemType[] = reactive([
  getMenuItem(
    '0',
    'Home',
    h(RouterLink, { to: '/' }, () => 'Home'),
    '/',
    h(MailOutlined),
  ),
  getMenuItem(
    '1',
    'Page-01',
    h(RouterLink, { to: '/page01' }, () => 'Page-01'),
    '/page01',
    h(MailOutlined),
  ),
  getMenuItem(
    '2',
    'Page-02',
    h(RouterLink, { to: '/page02' }, () => 'Page-02'),
    '/page02',
    h(CalendarOutlined),
  ),
  { type: 'divider' },
  { key: '121', type: 'group', label: 'xxxx', title: 'xxxx', children: [getMenuItem('31', 'Option 3', 'Option 3', '')] },
  getItem(
    'sub1',
    'Navigation Two',
    'Navigation Two',
    [
      getMenuItem('3', 'Option 3', 'Option 3', '1'),
      getMenuItem('4', 'Option 4', 'Option 4', '4'),
      getItem('sub1-2', 'Submenu', 'Submenu', [getMenuItem('5', 'Option 5', 'Option 5', '5'), getMenuItem('6', 'Option 6', 'Option 6', '6')]),
    ],
    h(AppstoreOutlined),
  ),
  getItem(
    'Navigation Three',
    'Navigation Three',
    'sub2',
    [getMenuItem('7', 'Option 7', 'Option 7', ''), getMenuItem('8', 'Option 8', 'Option 8', '8'), getMenuItem('9', 'Option 9', 'Option 9', '9'), getMenuItem('10', 'Option 10', 'Option 10', '10')],
    h(SettingOutlined),
  ),
]);
</script>

<style scoped></style>
