<template>
  <a-form :model="configForm">
    <a-form-item label="栅栏">
      <a-input-number v-model:value="configForm.col" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface Form {
  col: number;
}

const props = defineProps<{ form: Form }>();

const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();

const configForm = computed({
  get() {
    return props.form;
  },
  set(val) {
    emits('update:form', val);
  },
});
</script>

<style scoped></style>
