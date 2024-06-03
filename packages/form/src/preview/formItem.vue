<template>
  <div class="y-preview-form-item">
    <div v-if="label" class="item-label" :style="{ minWidth: `${labelWidth}px` }">
      <label :class="{ 'mark-required': required }">
        {{ label }}
      </label>
    </div>
    <div :class="['item-content']">
      <slot name="default"></slot>
      <span v-if="requiredMsg" class="required-msg">{{ requiredMsg }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style/formItem.less';
import { defineProps, inject } from 'vue';
interface FormItemProps {
  label?: string;
  required: boolean;
  requiredMsg?: string;
}

defineProps<FormItemProps>();

const labelWidth = inject('label-width', 100);
</script>

<style scoped></style>
