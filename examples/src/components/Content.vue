<template>
  <a-divider type="horizontal" orientation="left">Layout Sidebar</a-divider>
  <a-form>
    <a-form-item label="sidebar max width">
      <a-slider :min="80" :max="600" v-model:value="sidebar.maxWidth" />
    </a-form-item>
    <a-form-item label="sidebar min width">
      <a-slider :min="80" :max="600" v-model:value="sidebar.minWidth" />
    </a-form-item>
  </a-form>

  <a-divider type="horizontal" orientation="left">Layout Header</a-divider>
  <a-form-item>
    <a-form-item label="header height">
      <a-slider :min="50" :max="600" v-model:value="header.height" />
    </a-form-item>
    <a-form-item label="header isFixed">
      <a-switch v-model:checked="header.isFixed" />
    </a-form-item>
  </a-form-item>

  <a-divider type="horizontal" orientation="left">Layout Tabs</a-divider>
  <a-form-item>
    <a-form-item label="tabs height">
      <a-slider :min="10" :max="600" v-model:value="tabs.height" />
    </a-form-item>
    <a-form-item label="tabs top">
      <a-slider :min="0" :max="600" v-model:value="tabs.top" />
    </a-form-item>
    <a-form-item label="tabs isFixed">
      <a-switch v-model:checked="tabs.isFixed" />
    </a-form-item>
  </a-form-item>

  <a-divider type="horizontal" orientation="left">Layout Footer</a-divider>
  <a-form-item>
    <a-form-item label="footer height">
      <a-slider :min="10" :max="600" v-model:value="footer.height" />
    </a-form-item>
    <a-form-item label="footer isFixed">
      <a-switch v-model:checked="footer.isFixed" />
    </a-form-item>
  </a-form-item>

  <a-divider type="horizontal" orientation="left">Logo</a-divider>
  <a-form>
    <a-form-item label="app name">
      <a-input v-model:value="name" />
    </a-form-item>
    <a-form-item label="app logo">
      <a-input v-model:value="img" />
    </a-form-item>
    <a-form-item label="app logo width">
      <a-slider :min="10" :max="100" v-model:value="width" />
    </a-form-item>
    <a-form-item label="app logo height">
      <a-slider :min="10" :max="100" v-model:value="height" />
    </a-form-item>
    <a-form-item label="show tilte">
      <a-switch v-model:checked="showName" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { useLayoutHook, useLogoHook } from 'youyo-basic-layout/es/';

const { sidebar, header, tabs, footer } = useLayoutHook();
const { name, img, width, height, showName } = useLogoHook();
</script>

<style scoped></style>
