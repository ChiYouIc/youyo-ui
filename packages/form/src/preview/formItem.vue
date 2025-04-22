<template>
  <div class="y-preview-form-item">
    <div v-if="label" class="item-label" :style="labelStyle">
      <label :class="{ 'mark-required': required }">
        {{ label }}
      </label>
    </div>
    <div :class="['item-content']">
      <factory :el="component" />
      <span v-if="requiredMsg" class="required-msg">{{ requiredMsg }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/formItem.less';
import { computed, CSSProperties, defineProps, inject } from 'vue';
import Factory from '../factory/index.vue';
import AbstractComponent from '../core/AbstractComponent';
import Form from '../core/Form';

interface FormItemProps {
  component: AbstractComponent;
}

const props = defineProps<FormItemProps>();
const form = inject<Form>('form');

const labelStyle = computed<CSSProperties>(() => {
  return { minWidth: form?.labelWidth || '120px' };
});

const label = computed(() => props.component.label);
const required = computed(() => props.component.required);
const requiredMsg = computed(() => {
  if (!props.component.required) {
    return undefined;
  }
  const val = props.component.getVal();
  console.log(val);
  if (isNull(val)) {
    return '请输入';
  }

  return undefined;
});

function isNull(val: any): boolean {
  if (val === undefined || val === null) {
    return true;
  }

  if (typeof val === 'string') {
    return val.length === 0;
  }
}

/** 执行校验 */
function doValid(): boolean {}

/** 清除校验 */
function clearValid() {}

defineExpose({
  doValid,
  clearValid,
});
</script>

<style scoped></style>
