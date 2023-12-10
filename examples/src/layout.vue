<template>
  <youyo-base-frame v-bind="baseFrame" v-model:username="baseFrame.username">
    <div>sss</div>
    <a-input v-model:value="username"></a-input>
  </youyo-base-frame>
</template>

<script setup lang="ts">
import YouyoBaseFrame from '../../packages/layout/src/frame/BaseFrame.vue';
import { useBaseFrameHook } from '../../packages/layout/src/index.ts';
import { ref, reactive, h } from 'vue';
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { ItemType } from 'ant-design-vue';

const username = ref<string>('Admin');

function getItem(label: string, key: string, icon?: any, children?: ItemType[], type?: 'group'): ItemType {
  return {
    key,
    icon,
    children,
    label,
    title: label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('Navigation One', '1', h(MailOutlined)),
  getItem('Navigation Two', '2', h(CalendarOutlined)),
  getItem('Navigation Two', 'sub1', h(AppstoreOutlined), [getItem('Option 3', '3'), getItem('Option 4', '4'), getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')])]),
  getItem('Navigation Three', 'sub2', h(SettingOutlined), [getItem('Option 7', '7'), getItem('Option 8', '8'), getItem('Option 9', '9'), getItem('Option 10', '10')]),
]);

const { baseFrame } = useBaseFrameHook('1', 'xxxx', 'https://next.antdv.com/assets/logo.1ef800a8.svg', username, 'https://next.antdv.com/assets/logo.1ef800a8.svg', items);
</script>

<style></style>
