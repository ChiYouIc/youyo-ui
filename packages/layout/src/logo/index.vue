<template>
  <div class="global-logo">
    <img :height="height" :src="img" :width="width" alt="logo" />
    <span v-show="showName" class="sidebar-logo-title">{{ name }}</span>
  </div>
</template>

<script lang="ts" name="youyo-logo" setup>
import './style/index.less';
import { defineProps } from 'vue';
import type { LogoProps } from '../types';

defineProps<LogoProps>();
</script>
