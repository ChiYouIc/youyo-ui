<template>
  <form class="y-preview-form" :class="{ 'y-preview-form--vertical': form.labelLayout === 'vertical' }">
    <slot name="default"></slot>
  </form>
</template>

<script setup lang="ts">
import type { FormModel } from '../core';
import { provide } from 'vue';

const props = defineProps<{ form: FormModel; model: Record<string, any> }>();
provide('form', props.form);
</script>

<style scoped></style>
