<template>
  <div class="y-preview-form-item">
    <div v-if="label" class="item-label" :style="labelStyle">
      <label :class="{ 'mark-required': required }">
        {{ label }}
      </label>
    </div>
    <div :class="['item-content']" :mode="mode">
      <template v-if="showMode === 'form'">
        <factory :el="component" />
        <span v-if="requiredMsg" class="required-msg">{{ requiredMsg }}</span>
      </template>
      <template v-else>
        {{ nullDefaultValue(component.getVal()) }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/formItem.less';
import { computed, CSSProperties, defineProps, inject, ref } from 'vue';
import Factory from '../factory/index.vue';
import { isSuiteModel } from '../core/types';
import type { ComponentModel, FormModel } from '../core';

interface FormItemProps {
  component: ComponentModel;
}

const props = defineProps<FormItemProps>();
const form = inject<FormModel>('form');
const mode = inject<'form' | 'text'>('mode');
const requiredMsg = ref<string>();
const showMode = computed(() => {
  // 表格与套件在文本模式下也由组件自身渲染内容
  if (props.component.component === 'Table' || isSuiteModel(props.component)) {
    return 'form';
  }

  return mode;
});

const labelStyle = computed<CSSProperties>(() => {
  return { minWidth: form?.labelWidth || '120px' };
});

const label = computed(() => (isSuiteModel(props.component) ? '' : props.component.label));
const required = computed(() => props.component.required);

/** 执行校验 */
function doValid(): boolean {
  const message = props.component.validate();
  requiredMsg.value = message;
  return message === undefined;
}

/** 清除校验 */
function clearValid() {
  requiredMsg.value = undefined;
}

function nullDefaultValue(val: any): string {
  if (val === undefined || val === null) return '（空）';
  if (String(val).trim().length === 0) return '（空）';
  return val;
}

defineExpose({
  doValid,
  clearValid,
});
</script>

<style scoped></style>
