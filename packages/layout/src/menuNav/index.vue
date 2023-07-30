<template>
  <ul class="menu-nav" :class="[model === 'inline' ? menuNavInline : menuNavVertical]">
    <li
      v-for="menu in menuList"
      :key="menu.key"
      class="menu-title"
      :class="[model === 'inline' ? menuTitleInline : menuTitleVertical, activeMenu.key === menu.key ? 'sidebar-title-active' : '']"
      @click="onMenuClick(menu)"
    >
      <Component class="icon" :is="menu.meta.icon" />
      <span class="title">{{ $t('menu.meta.title') }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import './style/index.less';

export default defineComponent({
  name: 'youyo-menu-nav',
  props: {
    activeMenu: { type: Menu.MenuType, required: true },
    menuList: { type: Array<Menu.MenuType>, required: true },
    model: { type: String, required: true },
  },
  emits: ['menu-click'],
  setup(_, { emit }) {
    const router = useRouter();

    // 动态的样式
    const menuNavVertical = ref('sidebar-nav-vertical');
    const menuNavInline = ref('sidebar-nav-inline');
    const menuTitleVertical = ref('sidebar-title-vertical');
    const menuTitleInline = ref('sidebar-title-inline');

    function onMenuClick(menu: Menu.MenuType) {
      if (menu.isComponent) {
        router.push(menu.path);
      }
      emit('menu-click', menu);
    }

    return {
      menuNavVertical,
      menuNavInline,
      menuTitleVertical,
      menuTitleInline,
      onMenuClick,
    };
  },
});
</script>
