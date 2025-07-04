<template>
  <div class="sidebar-trigger-container">
    <div class="trigger">
      <div class="trigger-item">
        <span class="trigger-icon">
          <AimOutlined />
        </span>
        <span class="trigger-name">节点样式</span>
      </div>
      <div class="trigger-item">
        <span class="trigger-icon"><AimOutlined /></span>
        <span class="trigger-name">基础样式</span>
      </div>
      <div class="trigger-item">
        <span class="trigger-icon"><AimOutlined /></span>
        <span class="trigger-name">主题</span>
      </div>
      <div class="trigger-item">
        <span class="trigger-icon"><ApartmentOutlined /></span>
        <span class="trigger-name">结构</span>
      </div>
      <div class="trigger-item">
        <span class="trigger-icon"><AimOutlined /></span>
        <span class="trigger-name">大纲</span>
      </div>
      <div class="trigger-item">
        <span class="trigger-icon"><SettingOutlined /></span>
        <span class="trigger-name">设置</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../style/sidebar.less';
import { AimOutlined, SettingOutlined, ApartmentOutlined } from '@ant-design/icons-vue';
</script>
