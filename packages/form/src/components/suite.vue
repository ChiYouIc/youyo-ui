<template>
  <div :id="id" class="youyo-suite" :aria-label="ariaLabel">
    <div v-if="showTitle" class="youyo-suite__title">
      <span class="youyo-suite__title-label">{{ title }}</span>
      <span v-if="fieldName" class="youyo-suite__title-name">{{ fieldName }}</span>
    </div>
    <div v-for="field in fields" :key="field.primaryId()" class="youyo-suite__field">
      <div v-if="field.label" class="youyo-suite__label" :style="labelStyle">
        <label :class="{ 'marker-required': field.required }">{{ field.label }}</label>
      </div>
      <div class="youyo-suite__content">
        <factory v-if="showControl" :el="field" />
        <span v-else class="youyo-suite__text">{{ displayValue(field) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/suite.less';
import { computed, inject } from 'vue';
import type { CSSProperties } from 'vue';
import Factory from '../factory/index.vue';
import type { ComponentModel, FormModel } from '../core';

interface SuiteProps {
  id: string;
  title: string;
  fieldName?: string;
  fields: Array<ComponentModel>;
}

const props = defineProps<SuiteProps>();

const form = inject<FormModel | undefined>('form', undefined);
/** 预览会 provide mode，设计画布不会 */
const mode = inject<'form' | 'text' | undefined>('mode', undefined);

const showControl = computed(() => mode !== 'text');
/** 套件名称标记只在设计画布出现，预览里由内部字段自己表达 */
const showTitle = computed(() => mode === undefined && !!props.title);
const ariaLabel = computed(() => [props.title, props.fieldName].filter(Boolean).join(' '));
const labelStyle = computed<CSSProperties>(() => ({ minWidth: form?.labelWidth || '0' }));

/** 文本模式下的取值展示，与预览表单保持一致 */
function displayValue(field: ComponentModel): string {
  const value = field.getVal();

  if (value === undefined || value === null || String(value).trim().length === 0) {
    return '（空）';
  }

  if (Array.isArray(value)) {
    return value.length === 0 ? '（空）' : value.join('、');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}
</script>

<style scoped></style>
