<template>
  <div class="global-logo">
    <img width="25" height="25" :src="appLogoImg" alt="logo" />
    <span class="sidebar-logo-title" v-show="showTitle">{{ appName }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAppStore } from '../store';
import './style/index.less';

export default defineComponent({
  name: 'youyo-logo',
  props: { showTitle: Boolean },
  setup() {
    const { appName, appLogoImg } = useAppStore();
    return {
      appName,
      appLogoImg,
    };
  },
});
</script>
