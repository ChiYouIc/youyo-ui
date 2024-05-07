<template>
  <div class="global-logo">
    <img :width="width" :height="height" :src="img" alt="logo" />
    <span class="sidebar-logo-title" v-show="showName">{{ name }}</span>
  </div>
</template>

<script lang="ts" setup name="youyo-logo">
import './style/index.less';
import { defineProps } from 'vue';
import type { LogoProps } from '../types';

defineProps<LogoProps>();
</script>
