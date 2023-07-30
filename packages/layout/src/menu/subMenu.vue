<template>
  <a-sub-menu class="sub-menu" :key="menuInfo.key">
    <template #icon>
      <component :is="menuInfo.meta.icon" />
    </template>
    <template #title>
      <span>{{ $t('menuInfo.meta.title') }}</span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.hidden">
        <template v-if="item.children.length === 0">
          <a-menu-item :key="item.path">
            <template #icon>
              <component :is="item.meta.icon" />
            </template>
            <router-link :to="item.path">
              <span>{{ $t('item.meta.title') }}</span>
            </router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" name="YouyoSubMenu" setup>
import { defineProps } from 'vue';
import './style/subMenu.less';

interface SubMenuProps {
  menuInfo: Menu.MenuType;
}

defineProps<SubMenuProps>();
</script>
