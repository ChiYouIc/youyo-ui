<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon>
      <component :is="menuInfo.icon" />
    </template>
    <template #title>
      <span>{{ menuInfo.title }}</span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.hidden">
        <template v-if="item.children.length === 0">
          <a-menu-item :key="item.path">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <span @click="menuClick(item)">{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" name="youyo-sub-menu" setup>
import { defineProps } from 'vue';
import { MenuItemType } from '../hooks/useMenuHook';
import useMenuHook from '../hooks/useMenuHook';

defineProps<{ menuInfo: MenuItemType }>();

const { menuClick } = useMenuHook();
</script>

<style scoped></style>
