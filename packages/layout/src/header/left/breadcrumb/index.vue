<template>
  <a-breadcrumb class="menu-breadcrumb">
    <a-breadcrumb-item>
      <a @click="$router.push('/home')"><home-outlined />主页</a>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="menu in menuBreadcrumb" :key="menu.path">
      <component :is="menu.meta.icon" />
      {{ $t(menu.meta.title) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouteStore } from '../../../store';
import '../style/breadcrumb.less';

export default defineComponent({
  name: 'menu-breadcrumb',
  setup() {
    const route = useRouteStore();
    return {
      menuBreadcrumb: computed(() => route.menuBreadcrumb),
    };
  },
});
</script>
