<template>
  <div>
    <ul>
      <li v-for="(item,index) in msgList" :key="index">{{ item }}</li>
    </ul>
    <input v-model="msg">
    <button @click="handleSend">发送</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const msgList = ref<string[]>([]);
const msg = ref<string>('');

function handleSend() {
  msgList.value.push(msg.value);
  window.mcp.sendMessage(msg.value).then((res) => {
    msgList.value.push(res);
  });
}
</script>

<style scoped>

</style>