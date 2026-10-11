<template>
  <div class="youyo-form-design" :style="themeStyles">
    <div class="youyo-form-design__content">
      <template v-if="!open">
        <form-select :form="form" />
        <form-design :form="form" @preview="onPreview" />
        <form-config ref="formConfigRef" :form="form" />
      </template>
      <template v-else>
        <div></div>
        <youyo-form-preview :form="form" :data="formData" mode="form" />
        <div></div>
      </template>
    </div>
    <!-- <a-modal v-model:open="open" width="100%" wrap-class-name="full-modal" destroy-on-close>
      <a-tabs>
        <a-tab-pane key="form" tab="表单">
          <youyo-form-preview :form="form" :data="formData" mode="form" />
        </a-tab-pane>
        <a-tab-pane key="text" tab="文本">
          <youyo-form-preview :form="form" :data="formData" mode="text" />
        </a-tab-pane>
      </a-tabs>
    </a-modal> -->
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { computed, defineProps, onUnmounted, ref } from 'vue';
import type { CSSProperties } from 'vue';
import { theme } from 'ant-design-vue';
import FormSelect from './select.vue';
import FormDesign from './design.vue';
import FormConfig from './config.vue';
import type { ComponentModel, FormModel } from '../core';
import YouyoFormPreview from '../preview/index';
import { useMitt } from '../hooks';

const props = defineProps<{ form: FormModel }>();

const { token } = theme.useToken();
const themeStyles = computed<CSSProperties>(() => ({
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

const open = ref<boolean>(false);
const componentType = ref<'Component' | 'Form'>('Component');
const currItem = ref<ComponentModel>();
const formData = computed(() => props.form.formValue());
const { on, off } = useMitt();
const formConfigRef = ref();

// 消息总线，监听组件事件
function onToConfig(item: FormModel | ComponentModel) {
  onDesignComponentClick(item);
}

function onToRemove(item: ComponentModel) {
  props.form.remove(item);
}

function onToClean() {
  props.form.clear();
}

on('toConfig', onToConfig);
on('toRemove', onToRemove);
on('toClean', onToClean);

// useMitt 是模块级单例，卸载时必须注销，否则重复挂载会重复响应
onUnmounted(() => {
  off('toConfig', onToConfig);
  off('toRemove', onToRemove);
  off('toClean', onToClean);
});

function onPreview() {
  open.value = true;
}

function onDesignComponentClick(item: FormModel | ComponentModel): void {
  if ('primaryId' in item) {
    componentType.value = 'Component';
    currItem.value = item;
  } else {
    componentType.value = 'Form';
    currItem.value = undefined;
  }
  formConfigRef.value?.switchFormItemConfig(componentType.value, item);
}
</script>

<style scoped></style>
