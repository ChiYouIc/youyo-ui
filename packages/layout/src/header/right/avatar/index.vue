<template>
  <div class="avatar-dropdown">
    <a-dropdown placement="bottomRight">
      <div class="custom-account-avatar">
        <a-avatar size="small" :src="avatar" class="custom-global-header-index-avatar" />
        <span class="custom-global-header-index-name">{{ username }}</span>
      </div>
      <template #overlay>
        <a-menu class="custom-drop-down menu" :selected-keys="[]">
          <a-menu-item v-for="item in menuItem" :key="item.title" @click="item.action">
            <component :is="item.icon" class="action" />
            {{ $t(item.title) }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAvatarHook from '../../../hooks/useAvatarHook';
import '../style/avatar.less';
export default defineComponent({
  name: 'avatar-dropdown',
  setup() {
    const { username, avatar, menuItem } = useAvatarHook();
    return {
      username,
      avatar,
      menuItem,
    };
  },
});
</script>
