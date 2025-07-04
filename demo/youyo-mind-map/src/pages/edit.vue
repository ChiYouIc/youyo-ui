<template>
  <template v-if="data">
    <youyo-mind-map-edit :root="data.root" :theme="data.theme" layout="mindMap" @save="handleSave" />
  </template>
</template>

<script setup lang="ts">
import { YouyoMindMapEdit } from 'youyo-mind-map/src';
import exampleData from 'simple-mind-map/example/exampleData';
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';

const data = ref<any>();

onMounted(() => {
  const item = window.localStorage.getItem('map-map');
  if (item) {
    data.value = JSON.parse(item);
    console.log(data.value.root);
  } else {
    data.value = exampleData;
  }
});

function handleSave(data: any) {
  const root = data.root.data;
  console.log(root.text);
  window.localStorage.setItem('map-map', JSON.stringify(data));
  message.success('保存成功：' + root.text);
}
</script>

<style lang="less"></style>
