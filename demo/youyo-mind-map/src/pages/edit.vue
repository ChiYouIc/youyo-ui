<template>
  <a-spin :spinning="spinning">
    <youyo-mind-map-edit v-if="!spinning" ref="mindMapRef" :root="data.root" :theme="data.theme" layout="mindMap" @save="handleSave" @create="handleCreate" />
  </a-spin>
</template>

<script setup lang="ts">
import { YouyoMindMapEdit } from 'youyo-mind-map';
import exampleData from './exampleData';
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from 'youyo-tools/src';
import { MindMapType } from '../types';

const data = ref<any>();
const route = useRoute();
const router = useRouter();
const spinning = ref<boolean>(true);
const mindMapRef = ref();

onMounted(() => {
  init();
});

function init() {
  const { id } = route.params;
  if (id) {
    spinning.value = true;
    const { requestTool } = useRequest();
    requestTool.get<MindMapType>('/api/mm/' + id).then(res => {
      const d = res.data;
      if (d) {
        data.value = JSON.parse(d.content);
        spinning.value = false;
      }
    });
  }
}

function handleSave(data: any) {
  const root = data.root.data;
  window.localStorage.setItem('map-map', JSON.stringify(data));
  const { requestTool } = useRequest();
  const { id } = route.params;
  requestTool
    .post<null, MindMapType>('/api/mm/edit', {
      id: Number(id),
      name: String(root.text),
      content: JSON.stringify(data),
    })
    .then(() => {
      message.success('更新成功：' + root.text);
    });
}

function handleCreate() {
  const { root } = exampleData;
  const { requestTool } = useRequest();

  requestTool
    .post<MindMapType, Partial<MindMapType>>('/api/mm/add', {
      name: root.data.text,
      content: JSON.stringify(exampleData),
    })
    .then(res => {
      router.push({ path: '/' + res.data.id });
    });
}
</script>

<style lang="less"></style>
