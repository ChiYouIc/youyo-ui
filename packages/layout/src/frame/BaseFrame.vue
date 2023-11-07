<template>
  <div class="base-frame-layout">
    <youyo-layout v-bind="layout">
      <template #sidebar>
        <youyo-logo v-bind="logo" style="padding: 12px 10px" />
        <youyo-menu v-bind="menu" />
      </template>
      <template #header>
        <div class="base-frame-header">
          <div class="left">
            <span class="fold" @click="switchCol">
              <menu-unfold-outlined v-if="menu.inlineCollapsed" />
              <menu-fold-outlined v-else />
            </span>
          </div>
          <div class="right">
            <youyo-search v-bind="search" />
            <youyo-avatar v-bind="avatar" />
          </div>
        </div>
      </template>
      <template #tabs>
        <span>sss</span>
      </template>
      <template #content>
        <slot></slot>
      </template>
      <template #footer>
        <youyo-footer v-bind="footer" />
      </template>
    </youyo-layout>
  </div>
</template>

<script setup lang="ts" name="youyo-base-frame">
import './style/base.less';
import YouyoMenu from '../menu/index.vue';
import YouyoLayout from '../layout/index.vue';
import YouyoLogo from '../logo/index.vue';
import YouyoAvatar from '../avatar/index.vue';
import YouyoSearch from '../search/index.vue';
import YouyoFooter from '../footer/index.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

export interface BaseFrameProps {
  avatar: Object;
  layout: Object;
  logo: Object;
  menu: Object;
  search: Object;
  footer: Object;
  switchCol: () => void;
}

defineProps<BaseFrameProps>();
</script>

<style scoped></style>
