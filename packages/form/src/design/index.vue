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
import { computed, defineProps, ref } from 'vue';
import FormSelect from './select.vue';
import FormDesign from './design.vue';
import FormConfig from './config.vue';
import type { Form } from '../core';
import { AbstractComponent } from '../core';
import YouyoFormPreview from '../preview/index';
import { useMitt } from '../hooks';

const props = defineProps<{ form: Form }>();

const open = ref<boolean>(false);
const componentType = ref<'Component' | 'Form'>('Component');
const currItem = ref<AbstractComponent>();
const formData = computed(() => props.form.formValue());
const { on } = useMitt();
const formConfigRef = ref();

// 消息总线，监听组件事件
on('toConfig', item => onDesignComponentClick(item));
on('toRemove', item => props.form.remove(item as AbstractComponent));
on('toClean', () => props.form.clear());

function onPreview() {
  open.value = true;
}

function onDesignComponentClick(item: any): void {
  console.log('design index', item);
  componentType.value = item instanceof AbstractComponent ? 'Component' : 'Form';
  currItem.value = item;
  console.log(formConfigRef.value);
  formConfigRef.value?.switchFormItemConfig(componentType.value, item);
}
</script>

<style scoped></style>
