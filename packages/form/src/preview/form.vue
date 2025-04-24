<template>
  <form>
    <slot name="default"></slot>
  </form>
</template>

<script setup lang="ts">
import type { Form } from '../core';
import { provide } from 'vue';

const props = defineProps<{ form: Form; model: Record<string, any> }>();
provide('form', props.form);
</script>

<style scoped></style>
