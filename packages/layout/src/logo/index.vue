<template>
  <div class="global-logo">
    <img :width="width" :height="height" :src="img" alt="logo" />
    <span class="sidebar-logo-title" v-show="showName">{{ name }}</span>
  </div>
</template>

<script lang="ts" setup name="youyo-logo">
import './style/index.less';
import useLogoHook from '../hooks/useLogoHook';

const { name, img, width, height, showName } = useLogoHook();
</script>
