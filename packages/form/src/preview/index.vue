<template>
  <div class="form-preview">
    <div class="form-preview--content" :style="style">
      <div class="title">
        <span>{{ form.name }}</span>
      </div>
      <p v-if="form.description" class="description">{{ form.description }}</p>
      <y-form :model="data" :form="form">
        <template v-for="item in form.components" :key="item.primaryId()">
          <!-- 栅栏 -->
          <form-fence-item v-if="item.component === 'Fence'" :fence="item as FenceModel" />
          <!-- 表格 -->
          <y-form-item v-else :component="item" />
        </template>
      </y-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { computed, defineProps, provide } from 'vue';
import type { CSSProperties } from 'vue';
import { theme } from 'ant-design-vue';
import FormFenceItem from './formFenceItem.vue';
import YForm from './form.vue';
import YFormItem from './formItem.vue';
import type { FenceModel, FormModel } from '../core';

interface PreviewProps {
  form: FormModel;
  data: Record<string, any>;
  mode: 'form' | 'text';
}

const props = defineProps<PreviewProps>();
provide('mode', props.mode);

const { token } = theme.useToken();
const style = computed<CSSProperties>(() => ({
  width: props.form.width,
  height: props.form.height,
  '--form-vertical-spacing': `${props.form.verticalSpacing ?? 16}px`,
  '--form-horizontal-spacing': `${props.form.horizontalSpacing ?? 16}px`,
  '--youyo-color-bg-layout': token.value.colorBgLayout,
  '--youyo-color-bg-container': token.value.colorBgContainer,
  '--youyo-color-bg-elevated': token.value.colorBgElevated,
  '--youyo-color-border': token.value.colorBorder,
  '--youyo-color-border-secondary': token.value.colorBorderSecondary,
  '--youyo-color-text': token.value.colorText,
  '--youyo-color-text-heading': token.value.colorTextHeading,
  '--youyo-color-text-secondary': token.value.colorTextSecondary,
  '--youyo-color-text-tertiary': token.value.colorTextTertiary,
  '--youyo-color-primary': token.value.colorPrimary,
  '--youyo-color-primary-bg': token.value.colorPrimaryBg,
  '--youyo-color-primary-bg-hover': token.value.colorPrimaryBgHover,
  '--youyo-color-primary-border': token.value.colorPrimaryBorder,
  '--youyo-color-error': token.value.colorError,
  '--youyo-color-fill-tertiary': token.value.colorFillTertiary,
  '--youyo-box-shadow-secondary': token.value.boxShadowSecondary,
  '--youyo-box-shadow-tertiary': token.value.boxShadowTertiary,
}));
</script>

<style scoped></style>
