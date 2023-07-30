<template>
  <div style="padding: 5px 5px">
    <router-view ref="view" v-slot="{ Component }">
      <transition :name="themeStore.switchAnimation" mode="out-in">
        <template v-if="$route.meta['keepAlive']">
          <keep-alive :max="maxKeepAlive">
            <component :is="Component" :key="$route.name" v-if="app.reloadFlag" />
          </keep-alive>
        </template>
        <template v-else>
          <component :is="Component" :key="$route.name" v-if="app.reloadFlag" />
        </template>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { useAppStore, useThemeStore } from '../store';
import useContentHook from '../hooks/useContentHook';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'youyo-content',
  setup() {
    const themeStore = useThemeStore();
    const app = useAppStore();
    const { maxKeepAlive } = useContentHook();

    return {
      themeStore,
      app,
      maxKeepAlive,
    };
  },
});
</script>
