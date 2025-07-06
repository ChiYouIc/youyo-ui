<template>
  <router-view :key="currentKey"></router-view>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// 每次路径变化时返回新的 key，强制刷新页面
const currentKey = computed(() => route.fullPath);
</script>
