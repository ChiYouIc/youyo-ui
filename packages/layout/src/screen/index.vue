<template>
  <div class="full-screen" @click="handleFullScreen">
    <CompressOutlined v-if="isFullScreen" />
    <ExpandOutlined v-else />
  </div>
</template>
<script setup lang="ts" name="FullScreen">
import './style/index.less';
import { ref } from 'vue';
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons-vue';

const isFullScreen = ref<boolean>(false);

// 按钮事件
function handleFullScreen() {
  isFullScreen.value ? screenfullOut() : screenfullEnter();
}

// 进入全屏
function screenfullEnter() {
  const el = document.documentElement;
  const eventEnter = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  if (typeof eventEnter !== 'undefined' && eventEnter) {
    eventEnter.call(el);
    isFullScreen.value = true;
  }
}

// 退出全屏
function screenfullOut() {
  let eventOut = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullScreen;
  if (typeof eventOut !== 'undefined' && eventOut) {
    eventOut.call(document);
    isFullScreen.value = false;
  }
}
</script>
