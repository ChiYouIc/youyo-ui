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
import type { AbstractComponent, Form } from '../core';

interface FormItemProps {
  component: AbstractComponent;
}

const props = defineProps<FormItemProps>();
const form = inject<Form>('form');
const mode = inject<'form' | 'text'>('mode');
const requiredMsg = ref<string>();
const showMode = computed(() => {
  if (props.component.component == 'Table') {
    return 'form';
  }

  return mode;
});

const labelStyle = computed<CSSProperties>(() => {
  return { minWidth: form?.labelWidth || '120px' };
});

const label = computed(() => props.component.label);
const required = computed(() => props.component.required);

function isNull(val: any): boolean {
  if (val === undefined || val === null) {
    return true;
  }

  if (typeof val === 'string') {
    return val.length === 0;
  }

  return false;
}

/** 执行校验 */
function doValid(): boolean {
  if (!props.component.required) {
    return true;
  }
  const val = props.component.getVal();
  if (isNull(val)) {
    requiredMsg.value = '请输入';
    return false;
  }

  return false;
}

/** 清除校验 */
function clearValid() {
  requiredMsg.value = undefined;
}

function nullDefaultValue(val: any): string {
  if (val === undefined || val === null) '（空）';
  if (String(val).trim().length === 0) return '（空）';
  return val;
}

defineExpose({
  doValid,
  clearValid,
});
</script>

<style scoped></style>
