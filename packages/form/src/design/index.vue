<template>
  <div class="youyo-form-design">
    <div class="youyo-form-design__content">
      <form-select :form="form" />
      <form-design :form="form" @preview="onPreview" />
      <form-config ref="formConfigRef" :form="form" />
    </div>
    <a-modal v-model:open="open" width="100%" wrap-class-name="full-modal" destroy-on-close>
      <a-tabs>
        <a-tab-pane key="form" tab="表单">
          <youyo-form-preview :form="form" :data="formData" mode="form" />
        </a-tab-pane>
        <a-tab-pane key="text" tab="文本">
          <youyo-form-preview :form="form" :data="formData" mode="text" />
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { computed, defineProps, onUnmounted, ref } from 'vue';
import FormSelect from './select.vue';
import FormDesign from './design.vue';
import FormConfig from './config.vue';
import type { ComponentModel, FormModel } from '../core';
import YouyoFormPreview from '../preview/index';
import { useMitt } from '../hooks';

const props = defineProps<{ form: FormModel }>();

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
