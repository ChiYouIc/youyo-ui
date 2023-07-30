<template>
  <div class="menu-fold">
    <menu-unfold-outlined v-if="sidebarCollapsible" class="trigger" @click="() => setSidebarCollapsible(false)" />
    <menu-fold-outlined v-else class="trigger" @click="() => setSidebarCollapsible(true)" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useThemeStore } from '../../../store';
import '../style/flod.less';
export default defineComponent({
  name: 'menu-flod',
  setup() {
    const themeStore = useThemeStore();
    return {
      setSidebarCollapsible: themeStore.setSidebarCollapsible,
      sidebarCollapsible: computed(() => themeStore.sidebarCollapsible),
    };
  },
});
</script>
