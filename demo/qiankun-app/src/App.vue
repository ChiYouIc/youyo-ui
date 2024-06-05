<template>
  <layout />
  <div id="projects-container"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue';
import { start } from 'qiankun';
import Layout from './Layout.vue';

function toApp(path: string) {
  // 网上写法
  history.pushState({}, '', path);
  // push也可以
  // router.push(path);
}

onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    nextTick(() => {
      start();
    });
  }
});
</script>

<style scoped></style>
