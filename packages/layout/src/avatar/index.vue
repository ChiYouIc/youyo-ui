<template>
  <div class="youyo-avatar">
    <a-dropdown placement="bottomRight">
      <div class="custom-account-avatar">
        <a-avatar size="small" :src="avatar" class="custom-global-header-index-avatar" />
        <span class="custom-global-header-index-name">{{ username }}</span>
      </div>
      <template #overlay>
        <a-menu class="custom-drop-down menu" :selected-keys="[]">
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

interface AvatarProps {
  username: string;
  avatar: string;
  menuItem: {
    title: string;
    icon: string;
    action: () => void;
  }[];
}

defineProps<AvatarProps>();
</script>
