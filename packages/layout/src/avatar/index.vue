<template>
  <div class="youyo-avatar">
    <a-dropdown placement="bottomRight">
      <div class="custom-account-avatar">
        <a-avatar size="small" :src="avatar" class="custom-global-header-index-avatar" />
        <span class="custom-global-header-index-name">{{ username }}</span>
      </div>
      <template v-if="menuItem.length > 0" #overlay>
        <a-menu class="custom-drop-down menu">
          <a-menu-item v-for="item in menuItem" :key="item.title" @click="item.action">
            <component :is="item.icon" class="action" />
            {{ item.title }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup name="youyo-avatar">
import './style/index.less';
import { defineProps } from 'vue';
import type { AvatarProps } from '../types';

defineProps<AvatarProps>();
</script>
